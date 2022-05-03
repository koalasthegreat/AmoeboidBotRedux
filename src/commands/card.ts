import { SlashCommandBuilder } from "@discordjs/builders";

export const cardCommand = new SlashCommandBuilder()
	.setName('card')
	.setDescription('Search for a card')
	.addStringOption(option =>
		option.setName('name')
			.setDescription("The card name")
			.setRequired(true))
  .addStringOption(option => 
    option.setName('set')
      .setDescription("The set code of the card"))
  .addStringOption(option => 
    option.setName('artist')
      .setDescription("The card's artist"))
  .addBooleanOption(option => 
    option.setName('alternative')
      .setDescription("Find alt arts only"))
  .addBooleanOption(option => 
    option.setName('fullart')
      .setDescription("Find full arts only"))
