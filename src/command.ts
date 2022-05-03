import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { CommandInteraction } from "discord.js";
import { getCard } from "./cards";

import * as rawCommands from "./commands";

export const setupCommands = async () => {
	// Place your client and guild ids here
	const clientId = '716768705744470026';
	const guildId = '704080805080727583';

	const commands = [];
	commands.push(rawCommands.echoCommand.toJSON());
	commands.push(rawCommands.cardCommand.toJSON());

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
	else if (command.commandName === "card") {
		const name = command.options.getString('name') || "";
		const params = {
			setCode: command.options.getString('set')?.toUpperCase() || undefined,
			artist: command.options.getString('artist') || undefined,
			isAlternative: command.options.getBoolean('alternative') || undefined,
			isFullArt: command.options.getBoolean('full_art') || undefined
		}

		const card = await getCard(name, params);
		console.log(card);

		await command.reply(`Received request`);
	}
};
