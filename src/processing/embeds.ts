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

  if (card.mana_cost) {
    embed.addFields({ name: "Cost", value: `${card.getCost()}` });
  }

  if (card.power && card.toughness) {
    embed.addFields({ name: "Stats", value: `${card.power}/${card.toughness}` });
  }

  if (card.loyalty) {
    embed.addFields({ name: "Loyalty", value: `${card.loyalty}` });
  }

  return embed;
};
