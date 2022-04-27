import { Client } from "discord.js";
import "dotenv/config"

import * as command from "./src/command";


const client = new Client({
  intents: []
});

command.setupCommands();

client.login(process.env.DISCORD_TOKEN);

client.on('ready', (c) => {
  console.log("Client logged into Discord as " + c.user?.username + "#" + c.user?.discriminator);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;
	command.parseCommands(interaction);
})
