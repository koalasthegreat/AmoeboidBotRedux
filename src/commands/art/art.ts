import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Client from "src/classes/client";
import { Command, HTTPError } from "../../interfaces";
import { ratelimit } from "../../bot";
import { Cards } from "scryfall-sdk";
import { createArtEmbed } from "../../processing/embeds";

export default {
  data: new SlashCommandBuilder()
    .setName("art")
    .setDescription("Fetch a card's art")
    .addStringOption((option) => 
      option.setName("name").setDescription("The card's name").setRequired(true)
    )
    .addStringOption((option) => 
      option.setName("set").setDescription("Set symbol").setRequired(false)
    ),

  run: async (client: Client, interaction: CommandInteraction) => {
    const cardName = <string>interaction.options.get("name")?.value || "";
    const setCode = <string>interaction.options.get("set")?.value || undefined;
    
    try {
      const card = await ratelimit(() => Cards.byName(cardName, setCode, true));

      const embed = createArtEmbed(card);

      interaction.reply({ embeds: [embed] });
    } catch (error) {
      const err = error as HTTPError;

      if (err.status === 404) {
        interaction.reply(`Card with name \`${cardName}\` not found.`);
      } else {
        console.log("Something unexpected went wrong:", err);

        interaction.reply(
          `Something went wrong with your request, please try again later.`
        );
      }
    }
  }
} as Command
