-- CreateTable
CREATE TABLE "CachedCard" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "query" TEXT NOT NULL,
    "lastQueried" DATETIME NOT NULL,
    "card" TEXT NOT NULL
);
