import { Option, none, some } from "fp-ts/lib/Option";
import { Card } from "scryfall-sdk";
import { prisma } from "../bot";
import { CachedCard, HTTPError } from "../interfaces";
import { Either } from "fp-ts/lib/Either";
import { pipe } from "fp-ts/lib/function";
import { either, option } from "fp-ts";
import { ScryfallAPI } from "./scryfall";

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export abstract class ScryfallAPICache {
  public static async getCachedCardOrFetchByName(
    query: string
  ): Promise<Either<HTTPError, Card>> {
    const maybeCachedCard = this.getCachedCardByName(query);

    return pipe(
      await maybeCachedCard,
      option.fold(
        async () => await ScryfallAPI.byName(query),
        async (card) => either.right(card)
      )
    );
  }

  public static async getCachedCardByName(
    query: string
  ): Promise<Option<Card>> {
    const getCachedCard = await prisma.cachedCard.findFirst({
      where: {
        query,
        lastQueried: {
          gte: yesterday,
        },
      },
    });

    if (getCachedCard) {
      const card: Card = Card.construct(JSON.parse(getCachedCard.card));

      return some(card);
    }

    return none;
  }

  public static async upsertCardIntoCache(
    card: Card,
    query: string
  ): Promise<CachedCard> {
    const upsertCard = await prisma.cachedCard.upsert({
      where: {
        query,
      },
      update: {
        lastQueried: new Date(),
        card: JSON.stringify(card),
      },
      create: {
        query,
        lastQueried: new Date(),
        card: JSON.stringify(card),
      },
    });

    return upsertCard;
  }
}
