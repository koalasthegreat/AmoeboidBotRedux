import { Client } from "discord.js";
import "dotenv/config"

import { getRuling } from "./src/cards";

const client = new Client({
  intents: []
});

client.login(process.env.DISCORD_TOKEN);

client.on('ready', (d) => {
  console.log("Client logged into Discord as " + client.user?.username + "#" + client.user?.discriminator);
});
