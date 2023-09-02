import { PrismaClient } from "@prisma/client";
import { Guild } from "discord.js";
import { Option, none, some } from "fp-ts/lib/Option";

const prisma = new PrismaClient();

export abstract class ServerSettings {
  public static async setWrapping(guild: Guild, left: string, right: string): Promise<void> {
    const setWrap = await prisma.settings.upsert({
      where: {
        id: guild.id,
      },
      update: {
        left,
        right,
      },
      create: {
        id: guild.id,
        left,
        right,
      }
    });
  }

  public static async getWrapping(guild: Guild): Promise<Option<{ left: string, right: string }>> {
    const getWrap = await prisma.settings.findFirst({
      where: {
        id: guild.id
      }
    });

    if (getWrap) {
      const [left, right] = [getWrap.left, getWrap.right];

      return some({ left, right });
    }

    return none;
  }
}
