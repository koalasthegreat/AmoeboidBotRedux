import { ActivityType } from "discord.js";
import Client from "../classes/client";

export const updateRandomStatus = async (client: Client) => {
  interface Status {
    name: string;
    type: ActivityType.Playing | ActivityType.Watching | ActivityType.Listening;
  }

  const statuses: Status[] = [
    { name: "top 8 at F2F", type: ActivityType.Playing },
    { name: "against Tron and losing", type: ActivityType.Playing },
    { name: "the pack lottery", type: ActivityType.Playing },
    { name: "Cockatrice", type: ActivityType.Playing },
    { name: "Market Speculation 101", type: ActivityType.Playing },
    { name: "against burn", type: ActivityType.Playing },
    { name: "with dice", type: ActivityType.Playing },
    { name: "in garbage time", type: ActivityType.Playing },
    { name: "vintage cube draft", type: ActivityType.Playing },
    { name: "against That Guy™", type: ActivityType.Playing },
    { name: "against Rakdos Midrange again", type: ActivityType.Playing },
    { name: "pioneer 🤮", type: ActivityType.Playing },
    { name: "at FNM", type: ActivityType.Playing },
    { name: "proxied legacy", type: ActivityType.Playing },
    { name: "with my opponent's feelings 🥺", type: ActivityType.Playing },
    { name: "manaless dredge", type: ActivityType.Playing },
    { name: "Thoughtseize turn 1", type: ActivityType.Playing },
    { name: "the topdecking game", type: ActivityType.Playing },

    { name: "AspiringSpike on Twitch", type: ActivityType.Watching },
    { name: "MagicAids on YouTube", type: ActivityType.Watching },
    { name: "YungDingo on Twitch", type: ActivityType.Watching },
    { name: "AndreaMengucci on Twitch", type: ActivityType.Watching },
    { name: "yellowhat on Twitch", type: ActivityType.Watching },

    { name: "to my opponent whine", type: ActivityType.Listening },
  ];

  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  client.user?.setActivity(randomStatus.name, { type: randomStatus.type });
};
