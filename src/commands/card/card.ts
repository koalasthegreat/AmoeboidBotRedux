import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Card, Cards, } from "scryfall-sdk";
import Client from "src/classes/client";
import { Command } from "src/interfaces";
import { createCardEmbed } from "../../processing/embeds";


SlashCommandBuilder
export default {
  data: new SlashCommandBuilder()
  .setName("card")
  .setDescription("Fetches a card")
  .addStringOption(option => 
    option.setName("name")
      .setDescription("The card name")
      .setRequired(true)
  ),

  run: async (client: Client, interaction: CommandInteraction) => {
    const cardName = <string>interaction.options.get('name')?.value || "";
    const card: Card = await Cards.byName(cardName)
    const embed = createCardEmbed(card);

    interaction.reply({ embeds: [ embed ] });
  }
} as Command
