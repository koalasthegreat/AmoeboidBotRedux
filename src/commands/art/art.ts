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
    
    const maybeCard = await ScryfallAPI.byName(cardName, setCode);

    return pipe(
      maybeCard,
      either.fold(
        (error) => interaction.reply(`Something went wrong: \`${error.details}\``),
        (card) => {
          const embed = createArtEmbed(card);

          return interaction.reply({ embeds: [embed] });
        }
      )
    );
  }
} as Command
