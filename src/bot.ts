import { GatewayIntentBits } from "discord.js";
import { readdirSync } from "fs";
import * as dotenv from "dotenv";

import Client from "./classes/client";
import { pRateLimit } from "p-ratelimit";
import { updateRandomStatus } from "./status/status";
import { PrismaClient } from "@prisma/client";

console.log("Bot is starting...");

// Config Dotenv
dotenv.config();

export const TOKEN = process.env.DISCORD_TOKEN || "";
export const GUILD_ID = process.env.GUILD_ID || "";
export const DEFAULT_LEFT_WRAP = process.env.DEFAULT_LEFT_WRAP || "";
export const DEFAULT_RIGHT_WRAP = process.env.DEFAULT_RIGHT_WRAP || "";
export const STATUS_UPDATE_DELAY = parseInt(
  process.env.STATUS_UPDATE_DELAY || "15"
);

// Init Ratelimit
export const ratelimit = pRateLimit({
  interval: 50,
  rate: 1,
  concurrency: 1,
});

// Status Updating
setInterval(
  async () => updateRandomStatus(client),
  60000 * STATUS_UPDATE_DELAY
);

// Create Prisma Client
export const prisma = new PrismaClient();

// Create Client
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Events
readdirSync("./src/events").forEach((file) =>
  client.on(file.split(".")[0], async (...args) =>
    (await import(`./events/${file}`)).default(client, ...args)
  )
);

// Set Commands
readdirSync("./src/commands").forEach((cat) => {
  readdirSync(`./src/commands/${cat}`).forEach(async (file) => {
    const command = (await import(`./commands/${cat}/${file}`)).default;

    if (!command || !command?.data?.name) return;

    client.commands.set(command.data.name, command);
  });
});

client.login(TOKEN);
