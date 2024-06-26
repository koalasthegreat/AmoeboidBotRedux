import {
  Client,
  CommandInteraction,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from "discord.js";
import { Command } from "../../interfaces";
import { ServerSettings } from "../../settings/settings";

export default {
  data: new SlashCommandBuilder()
    .setName("wrapping")
    .setDescription("Set the card detection wrapping for this server")
    .addStringOption((option) =>
      option.setName("left").setDescription("Left symbol").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("right").setDescription("Right symbol").setRequired(true)
    )
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

  run: async (client: Client, interaction: CommandInteraction) => {
    const guild = interaction.guild;
    const left = <string>interaction.options.get("left")?.value;
    const right = <string>interaction.options.get("right")?.value;

    if (guild) {
      await ServerSettings.setWrapping(guild, left, right);

      return interaction.reply({
        content: `Server wrapping changed to \`${left} ${right}\`.`,
        ephemeral: true,
      });
    }

    return interaction.reply({
      content:
        "Something went wrong when trying to change the server wrapping.",
      ephemeral: true,
    });
  },
} as Command;
