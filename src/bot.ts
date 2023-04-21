import { Client } from "discord.js";
import * as dotenv from "dotenv";

import ready from "./listeners/ready";

console.log("Bot is starting...");

dotenv.config();

const token = process.env.DISCORD_TOKEN;

const client = new Client({
  intents: []
});

ready(client);

client.login(token);
