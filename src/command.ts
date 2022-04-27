import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { CommandInteraction } from "discord.js";

import * as rawCommands from "./commands";

export const setupCommands = async () => {
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
}


export const parseCommands = async (command: CommandInteraction) => {
	if (command.commandName === "echo") {
		const input = command.options.getString('input');

		await command.reply(input || "No input supplied");
	}
};
