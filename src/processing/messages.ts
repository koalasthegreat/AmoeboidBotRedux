import { Message } from "discord.js";
import { LEFT_WRAP, RIGHT_WRAP } from "../bot";
import { Card, Cards } from "scryfall-sdk";

export const extractCardsFromMessage = async (message: Message): Promise<Card[]> => {
  const escape = (string: string): string => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const wrapRegex = new RegExp(`${escape(LEFT_WRAP)}(.*?)${escape(RIGHT_WRAP)}`, 'g');

  const results = [...message.content.matchAll(wrapRegex)];

  const cards: Card[] = await Promise.all(results.map(async (match) => Cards.byName(match[1])));

  return cards;
};
