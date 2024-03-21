import { AutocompleteInteraction, Client, CommandInteraction, SlashCommandBuilder } from "discord.js";
import { Command } from "../../interfaces";
import { ScryfallAPI } from "../../classes/scryfall";
import { either } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { createRulingsEmbed } from "../../processing/embeds";

export default {
  data: new SlashCommandBuilder()
    .setName("rulings")
    .setDescription("List rulings for a card")
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

    const maybeRuling = await ScryfallAPI.rulings(cardName);

    return pipe(
      maybeRuling,
      either.fold(
        (error) => interaction.reply(`Something went wrong: \`${error.details}\``),
        (response) => {
          const { card, rulings } = response;

          if (rulings.length == 0) return interaction.reply(`No rulings found for ${card.name}.`);

          const embed = createRulingsEmbed(card, rulings);

          return interaction.reply({ embeds: [embed] });
        }
      )
    )
  },
} as Command;
