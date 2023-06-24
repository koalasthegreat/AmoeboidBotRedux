import { EmbedBuilder } from "discord.js";
import { Card } from "scryfall-sdk";
import {
  getColorIdentity,
  getFormattedDescription,
  getLegalityString,
} from "./formatting";

export const createCardEmbed = (card: Card): EmbedBuilder => {
  const embed = new EmbedBuilder()
    .setTitle(card.name)
    .setDescription(getFormattedDescription(card))
    .setColor(getColorIdentity(card))
    .addFields({ name: "Legalities", value: getLegalityString(card) });

  if (card.image_uris?.normal) {
    embed.setImage(`${card.getImageURI("normal")}`);
  }
  
  if (card.mana_cost) {
    embed.addFields({ name: "Cost", value: `${card.getCost()}` });
  }

  if (card.power && card.toughness) {
    embed.addFields({
      name: "Stats",
      value: `${card.power}/${card.toughness}`,
    });
  }

  if (card.loyalty) {
    embed.addFields({ name: "Loyalty", value: `${card.loyalty}` });
  }

  return embed;
};

export const createMultiCardEmbeds = (cards: Card[]): EmbedBuilder[] => {
  const embeds: EmbedBuilder[] = cards.map((card) => new EmbedBuilder()
    .setURL("https://scryfall.com/").setImage(card.image_uris?.normal || "")
  );

  embeds[0].setTitle(`Found ${cards.length} cards:`);

  return embeds;
}

export const createArtEmbed = (card: Card): EmbedBuilder => {
  const embed = new EmbedBuilder()
    .setTitle(`${card.name} — ${card.set.toUpperCase()}`)
    .setImage(`${card.image_uris?.art_crop}`)
    .setFooter({ text: `${card.artist || ""} — ™ and © Wizards of the Coast` })

  return embed;
}
