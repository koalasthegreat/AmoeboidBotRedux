import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import Client from "src/classes/client";
import { Command } from "src/interfaces";
import { createCardEmbed } from "../../processing/embeds";
import { ScryfallAPI } from "../../classes/scryfall";
import { pipe } from "fp-ts/lib/function";
import { either } from "fp-ts";

export default {
  data: new SlashCommandBuilder()
    .setName("card")
    .setDescription("Fetches a card")
    .addStringOption((option) =>
      option.setName("name").setDescription("The card name").setRequired(true)
    )
    .addStringOption((option) => 
      option.setName("set").setDescription("The card's set").setRequired(false)
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
          const embed = createCardEmbed(card);

          return interaction.reply({ embeds: [embed] });
        }
      )
    );
  },
} as Command;
