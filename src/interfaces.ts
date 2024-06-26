import { AutocompleteInteraction, SlashCommandBuilder } from "discord.js";
import { Card } from "scryfall-sdk";

export interface Command {
  data: SlashCommandBuilder;
  permissions?: string[];

  autocomplete(interaction: AutocompleteInteraction): any;
  run(...args: any[]): any;
}

export interface HTTPError {
  object: string;
  code: string;
  status: 404;
  details: string;
  attempts: number;
}

export interface CachedCard {
  query: string;
  lastQueried: Date;
  card: string;
}

export const doubleFacedLayouts = [
  "double_faced_token",
  "double_sided",
  "flip",
  "modal_dfc",
  "split",
  "transform",
];
