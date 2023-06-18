import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Card, Cards } from "scryfall-sdk";
import Client from "src/classes/client";
import { Command, HTTPError } from "src/interfaces";
import { createCardEmbed } from "../../processing/embeds";

export default {
  data: new SlashCommandBuilder()
    .setName("card")
    .setDescription("Fetches a card")
    .addStringOption((option) =>
      option.setName("name").setDescription("The card name").setRequired(true)
    ),

  run: async (client: Client, interaction: CommandInteraction) => {
    const cardName = <string>interaction.options.get("name")?.value || "";

    try {
      const card: Card = await Cards.byName(cardName);

      const embed = createCardEmbed(card);

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      const err = error as HTTPError;

      if (err.status === 404) {
        interaction.reply(`Card with name \`${cardName}\` not found.`);
      } else {
        interaction.reply(
          `Something went wrong with your request, please try again later.`
        );
      }
    }
  },
} as Command;
