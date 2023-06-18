import { EmbedBuilder } from "discord.js";
import { Card } from "scryfall-sdk";
import {
  getColorIdentity,
  getFormattedDescription,
  getLegalityString,
} from "./formatting";

export const createCardEmbed = (card: Card): EmbedBuilder => {
  const colorIdentity = getColorIdentity(card);

  const embed = new EmbedBuilder()
    .setTitle(card.name)
    .setDescription(getFormattedDescription(card))
    .setColor(colorIdentity)
    .addFields({ name: "Legalities", value: getLegalityString(card) });

  return embed;
};
