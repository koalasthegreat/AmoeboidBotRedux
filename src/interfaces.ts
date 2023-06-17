import { SlashCommandBuilder } from "discord.js"

export interface Command {
  data: SlashCommandBuilder
  permissions?: string[],

  run(...args: any[]): any
}

export interface HTTPError {
  object: string;
  code: string;
  status: 404;
  details: string;
  attempts: number;
}
