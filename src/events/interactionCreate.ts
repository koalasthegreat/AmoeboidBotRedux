import { CommandInteraction } from "discord.js";
import Client from "../classes/client";

export default (client: Client, interaction: CommandInteraction): void => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    command.run(client, interaction);
  } catch (e) {
    if (interaction.replied) interaction.followUp("Something went wrong while running command.");
    else interaction.reply("Something went wrong while running command.");
  }
};
