import { SlashCommandBuilder } from "discord.js"

export interface Command {
  data: SlashCommandBuilder
  permissions?: string[],

  run(...args: any[]): any
}
