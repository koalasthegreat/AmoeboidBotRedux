import { Message } from "discord.js";
import { Card } from "scryfall-sdk";
import { ScryfallAPI } from "../classes/scryfall";
import { isRight } from "fp-ts/lib/Either";

export const extractCardsFromMessage = async (message: Message, wrapping: { left: string, right: string }): Promise<Card[]> => {
  const escape = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const wrapRegex = new RegExp(`${escape(wrapping.left)}(.*?)${escape(wrapping.right)}`, 'g');

  const results = [...message.content.matchAll(wrapRegex)];

  // TODO: find a cleaner way to let the user know 10 cards is too many
  if (results.length >= 10) {
    return [];
  }

  const maybeCards = await Promise.all(results.map(async (match) => ScryfallAPI.byName(match[1])));

  const cards = maybeCards.filter(isRight).map((card) => card.right);

  return cards;
};
