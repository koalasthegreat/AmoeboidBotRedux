import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const result = await prisma.cards.findFirst({
    where: {
      name: "Amoeboid Changeling"
    },
    select: {
      colors: true,
      manaCost: true,
      types: true
    }
  });

  console.log(result);
}

main()
  .catch((e) => {
    throw e;
  });
