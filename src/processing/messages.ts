import { Message } from "discord.js";
import { Card } from "scryfall-sdk";
import { isRight } from "fp-ts/lib/Either";
import { ScryfallAPICache } from "../classes/caching";

export const extractCardsFromMessage = async (
  message: Message,
  wrapping: { left: string; right: string }
): Promise<Card[]> => {
  const escape = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  const wrapRegex = new RegExp(
    `${escape(wrapping.left)}(.*?)${escape(wrapping.right)}`,
    "g"
  );

  const results = [...message.content.matchAll(wrapRegex)];

  // TODO: find a cleaner way to let the user know 10 cards is too many
  if (results.length >= 10) {
    return [];
  }

  // TODO: extend this and make it support other parameters (if we end up supporting other parameters)
  const matches = results
    .map((val) => val[1].split(";"))
    .map((val) => {
      if (val.length > 1) {
        const maybeSet = val[1].split("=");

        if (maybeSet.length > 1) {
          const set = maybeSet[1];

          return { name: val[0], set };
        }
      }

      return { name: val[0], set: "" };
    });

  const maybeCards = await Promise.all(
    matches.map(async (match) =>
      ScryfallAPICache.getCachedCardOrFetchByName(match.name, match.set)
    )
  );

  const cards = maybeCards.filter(isRight).map((card) => card.right);

  return cards;
};
