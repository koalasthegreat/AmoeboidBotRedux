import { Client } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import "dotenv/config"

import * as rawCommands from "./src/commands/index"

const client = new Client({
  intents: []
});

client.login(process.env.DISCORD_TOKEN);

client.on('ready', (c) => {
  console.log("Client logged into Discord as " + c.user?.username + "#" + c.user?.discriminator);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === "echo") {
		const input = interaction.options.getString('input');

		await interaction.reply(input || "No input supplied");
	}
})


// Place your client and guild ids here
const clientId = '716768705744470026';
const guildId = '704080805080727583';

const commands = [];
commands.push(rawCommands.echo.toJSON());


const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN || "");

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
