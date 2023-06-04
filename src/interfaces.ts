import { ApplicationCommandOption } from "discord.js"

export interface Command {
  data: {
    name: string,
    description: string,
    type?: number,
    options?: ApplicationCommandOption[]
  },
  permissions?: string[],

  run(...args: any[]): any
}
