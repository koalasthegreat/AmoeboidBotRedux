import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Card, Cards, } from "scryfall-sdk";
import Client from "src/classes/client";
import { Command } from "src/interfaces";


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

    interaction.reply(`The card's name is ${card.name}`);
  }
} as Command
