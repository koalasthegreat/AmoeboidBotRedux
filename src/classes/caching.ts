import { Option, none, some } from "fp-ts/lib/Option";
import { Card } from "scryfall-sdk";
import { prisma } from "../bot";
import { CachedCard } from "src/interfaces";


const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export abstract class ScryfallAPICache {
  public static async getCachedCardByName(query: string): Promise<Option<Card>> {
    const getCachedCard = await prisma.cachedCard.findFirst({
      where: {
        query,
        lastQueried: {
          lte: yesterday
        }
      }
    });

    if (getCachedCard) {
      const card: Card = JSON.parse(getCachedCard.card);

      return some(card);
    }

    return none;
  }

  public static async upsertCardIntoCache(card: Card, query: string): Promise<CachedCard> {
    const upsertCard = await prisma.cachedCard.upsert({
      where: {
        query
      },
      update: {
        lastQueried: new Date(),
        card: JSON.stringify(card),
      },
      create: {
        query,
        lastQueried: new Date(),
        card: JSON.stringify(card)
      }
    });

    return upsertCard;
  }
}
