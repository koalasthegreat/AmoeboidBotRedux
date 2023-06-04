import { Command } from "src/interfaces";

export default {
  data: {
    name: "card",
    description: "Fetches a card",
    type: 1,
    options: []
  },
  run: async (client, interaction) => {
    interaction.reply("This is a test command.")
  }
} as Command
