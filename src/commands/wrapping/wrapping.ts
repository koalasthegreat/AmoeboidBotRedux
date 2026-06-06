import {
  Client,
  ChatInputCommandInteraction,
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

  run: async (client: Client, interaction: ChatInputCommandInteraction) => {
    const guild = interaction.guild;
    const left = interaction.options.getString("left") || "[[";
    const right = interaction.options.getString("right") || "]]";

    if (guild) {
      await ServerSettings.setWrapping(guild, left, right);

      return interaction.reply({
        content: `Server wrapping changed to \`${left} ${right}\`.`,
        flags: ["Ephemeral"]
      });
    }

    return interaction.reply({
      content:
        "Something went wrong when trying to change the server wrapping.",
      flags: ["Ephemeral"]
    });
  },
} as Command;
