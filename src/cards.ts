import { Card, PrismaClient, Ruling } from "@prisma/client";
import { map } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import { fromNullable, Option } from "fp-ts/lib/Option";


const prisma = new PrismaClient();

const normalPaperOnly = {
  isOnlineOnly: 0,
  isOversized: 0,
  isRebalanced: 0,
}

export const getCard = async (name: string, parameters?: object): Promise<Option<Card>> => {
  const result = await prisma.card.findFirst({
    where: {
      name,
      ...parameters,
      ...normalPaperOnly
    }
  });

  return fromNullable(result);
}

export const getRuling = async (name: string): Promise<Option<Ruling>> => {
  const result = await prisma.card.findFirst({
    where: {
      name
    },
    select: {
      rulings: {
        select: {
          text: true
        }
      }
    }
  });

  return fromNullable(result);
}
