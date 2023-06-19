import { Message } from "discord.js";
import Client from "../classes/client";
import { LEFT_WRAP, RIGHT_WRAP } from "../bot";
import { extractCardsFromMessage } from "../processing/messages";
import { Card } from "scryfall-sdk";
import { createCardEmbed } from "../processing/embeds";

export default async (client: Client, message: Message) => {
  if (message.author === client.user || message.author.bot) return;

  if (message.content.includes(LEFT_WRAP) && message.content.includes(RIGHT_WRAP)) {
    const cards: Card[] = await extractCardsFromMessage(message);

    if (cards.length === 0) return;

    if (cards.length === 1) {
      const embed = createCardEmbed(cards[0]);

      message.reply({ embeds: [embed] });
    }

    // TODO: Implement getting more than one card this way
  }
};
