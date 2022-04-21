import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const normalPaperOnly = {
  isOnlineOnly: 0,
  isOversized: 0,
  isRebalanced: 0,
}

export const getCard = async (name: string, parameters?: object) => {
  return prisma.cards.findFirst({
    where: {
      name,
      ...parameters,
      ...normalPaperOnly
    }
  });
}

export const getRuling = async (name: string) => {
  return prisma.cards.findFirst({
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
}
