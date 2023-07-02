import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Client from "src/classes/client";
import { Command, HTTPError } from "../../interfaces";
import { createArtEmbed } from "../../processing/embeds";
import { ScryfallAPI } from "../../classes/scryfall";
import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

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
    
    const maybeCard = await ScryfallAPI.byName(cardName, setCode, true);

    pipe(
      maybeCard,
      either.fold(
        (error) => {
          if (error.status === 404) {
            interaction.reply(`Card with name \`${cardName}\` not found.`);
          } else {
            console.log("Something unexpected went wrong:", error);
    
            interaction.reply(
              `Something went wrong with your request, please try again later.`
            );
          }
        },
        (card) => {
          const embed = createArtEmbed(card);

          interaction.reply({ embeds: [embed] });
        }
      )
    );
  }
} as Command
