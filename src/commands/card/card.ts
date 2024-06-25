import { AutocompleteInteraction, CommandInteraction, SlashCommandBuilder } from "discord.js";
import Client from "src/classes/client";
import { Command } from "src/interfaces";
import { createCardEmbed } from "../../processing/embeds";
import { ScryfallAPI } from "../../classes/scryfall";
import { pipe } from "fp-ts/lib/function";
import { either } from "fp-ts";
import { ScryfallAPICache } from "../../classes/caching";

export default {
  data: new SlashCommandBuilder()
    .setName("card")
    .setDescription("Fetches a card")
    .addStringOption((option) =>
      option.setName("name").setDescription("The card name").setRequired(true).setAutocomplete(true)
    ),

  autocomplete: async (interaction: AutocompleteInteraction) => {
    const focusedValue = interaction.options.getFocused();

    if (focusedValue === "") return [];

    const autocompleteValues = await ScryfallAPI.autocomplete(focusedValue);

    const autocomplete = autocompleteValues.map((v) => ({ name: v, value: v }))

    await interaction.respond(autocomplete);
  },

  run: async (client: Client, interaction: CommandInteraction) => {
    const cardName = <string>interaction.options.get("name")?.value || "";

    const maybeCard = await ScryfallAPICache.getCachedCardOrFetchByName(cardName);

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
