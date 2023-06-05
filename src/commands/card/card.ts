import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Client from "src/classes/client";
import { Command } from "src/interfaces";


SlashCommandBuilder
export default {
  data: new SlashCommandBuilder()
  .setName("card")
  .setDescription("Fetches a card"),

  run: async (client: Client, interaction: CommandInteraction) => {
    interaction.reply(`Card name given was ${interaction}`)
  }
} as Command
