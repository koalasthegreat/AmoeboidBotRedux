import { Message } from "discord.js";
import Client from "../classes/client";
import { DEFAULT_LEFT_WRAP, DEFAULT_RIGHT_WRAP } from "../bot";
import { extractCardsFromMessage } from "../processing/messages";
import { Card } from "scryfall-sdk";
import { createCardEmbed, createMultiCardEmbeds } from "../processing/embeds";
import { fold, some } from "fp-ts/lib/Option";
import { ServerSettings } from "../settings/settings";
import { pipe } from "fp-ts/lib/function";

export default async (client: Client, message: Message) => {
  if (message.author === client.user || message.author.bot) return;

  const maybeWrapping =
    message.guild === null
      ? some({ left: DEFAULT_LEFT_WRAP, right: DEFAULT_RIGHT_WRAP })
      : await ServerSettings.getWrapping(message.guild!);

  const wrapping = pipe(
    maybeWrapping,
    fold(
      () => ({ left: DEFAULT_LEFT_WRAP, right: DEFAULT_RIGHT_WRAP }),
      (wrapping) => wrapping
    )
  );

  if (
    message.content.includes(wrapping.left) &&
    message.content.includes(wrapping.right)
  ) {
    const cards: Card[] = await extractCardsFromMessage(message, wrapping);

    if (cards.length === 0) return;
    else if (cards.length === 1) {
      const embed = createCardEmbed(cards[0]);

      message.reply({ embeds: [embed] });
    } else {
      const embeds = createMultiCardEmbeds(cards);

      message.reply({ embeds });
    }
  }
};
