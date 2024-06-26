import { AutocompleteInteraction, CommandInteraction } from "discord.js";
import Client from "../classes/client";

export default async (
  client: Client,
  interaction: CommandInteraction | AutocompleteInteraction
): Promise<void> => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      command.run(client, interaction);
    } catch (e) {
      if (interaction.replied)
        interaction.followUp("Something went wrong while running command.");
      else interaction.reply("Something went wrong while running command.");
    }
  } else if (interaction.isAutocomplete()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.autocomplete(interaction);
    } catch (error) {
      console.error(error);
    }
  }
};
