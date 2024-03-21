import { Card, Cards, Ruling } from "scryfall-sdk";
import { ratelimit } from "../bot";
import { either } from "fp-ts";
import { HTTPError } from "src/interfaces";
import { Either } from "fp-ts/lib/Either";

export abstract class ScryfallAPI {
  public static async byName(name: string, set?: string, fuzzy: boolean = true): Promise<Either<HTTPError, Card>> {
    try {
      const card = await ratelimit(() => Cards.byName(name, set, fuzzy));

      return either.right(card);
    } catch (error) {
      const err = error as HTTPError;

      return either.left(err);
    }
  }

  public static async rulings(name: string): Promise<Either<HTTPError, Ruling[]>> {
    try {
      const card = await ratelimit(() => Cards.byName(name, true));

      const rulings = await ratelimit(() => card.getRulings());

      return either.right(rulings);
    } catch (error) {
      const err = error as HTTPError;

      return either.left(err);
    }
  }

  public static async autocomplete(name: string) {
    const result = await Cards.autoCompleteName(name);

    return result;
  }
}
