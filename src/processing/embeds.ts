import { EmbedBuilder } from "discord.js";
import { Card } from "scryfall-sdk";
import {
  formatPrices,
  getColorIdentity,
  getFormattedDescription,
  getLegalityString,
} from "./formatting";
import { doubleFacedLayouts } from "../interfaces";

export const createCardEmbed = (card: Card): EmbedBuilder => {
  const embed = new EmbedBuilder()
    .setTitle(card.name)
    .setDescription(getFormattedDescription(card))
    .setURL(`${card.scryfall_uri}`)
    .setColor(getColorIdentity(card))
    .addFields({ name: "Prices", value: formatPrices(card), inline: true })
    .addFields({ name: "Legalities", value: getLegalityString(card), inline: true })
    .addFields({ name: "Type", value: card.type_line })
    .addFields({ name: "Set", value: `[${card.set.toUpperCase()}] ${card.set_name}` });

  if (doubleFacedLayouts.find((layout) => layout === card.layout)) {
    // TODO: Make the images appear side by side, instead of just
    // jamming it in the thumbnail
    const [face1, face2] = card.card_faces;

    if (face1.image_uris?.normal && face2.image_uris?.normal) {
      embed.setImage(`${face1.getImageURI("normal")}`);
      embed.setThumbnail(`${face2.getImageURI("normal")}`);
    }
  } else {
    if (card.image_uris?.normal) {
      embed.setImage(`${card.getImageURI("normal")}`);
    }
  }
  
  if (card.mana_cost) {
    embed.addFields({ name: "Cost", value: `${card.getCost()}`, inline: true });
  }

  if (card.power && card.toughness) {
    embed.addFields({
      name: "Stats",
      value: `${card.power}/${card.toughness}`,
      inline: true
    });
  }

  if (card.loyalty) {
    embed.addFields({ name: "Loyalty", value: `${card.loyalty}`, inline: true });
  }

  if (card.reserved) {
    embed.setFooter({ text: "Part of the Reserved List" })
  }

  return embed;
};

export const createMultiCardEmbeds = (cards: Card[]): EmbedBuilder[] => {
  const embeds: EmbedBuilder[] = [];

  cards.forEach((card) => {    
    if (doubleFacedLayouts.find((layout) => layout === card.layout)) {
      const [face1, face2] = card.card_faces;

      embeds.push(new EmbedBuilder()
        .setURL("https://scryfall.com/")
        .setImage(face1.image_uris?.normal || ""));

      embeds.push(new EmbedBuilder()
        .setURL("https://scryfall.com/")
        .setImage(face2.image_uris?.normal || ""));
    } else {
      embeds.push(new EmbedBuilder()
        .setURL("https://scryfall.com/")
        .setImage(card.image_uris?.normal || ""));
    }
  });

  embeds[0].setTitle(`Found ${cards.length} cards:`);

  return embeds;
}

export const createArtEmbed = (card: Card): EmbedBuilder => {
  const embed = new EmbedBuilder()
    .setTitle(`${card.name} — ${card.set.toUpperCase()}`)
    .setURL(`${card.scryfall_uri}`)
    .setImage(`${card.image_uris?.art_crop}`)
    .setFooter({ text: `${card.artist || ""} — ™ and © Wizards of the Coast` })

  return embed;
}
