import { Option, none, some } from "fp-ts/lib/Option";
import { Card } from "scryfall-sdk";
import { prisma } from "../bot";


const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

export abstract class ScryfallAPICache {
  public static async getCachedCardByName(name: string): Promise<Option<Card>> {
    const getCachedCard = await prisma.cachedCard.findFirst({
      where: {
        query: name,
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
}