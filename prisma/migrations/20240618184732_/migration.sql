-- CreateTable
CREATE TABLE "CachedCard" (
    "query" TEXT NOT NULL PRIMARY KEY,
    "lastQueried" DATETIME NOT NULL,
    "card" TEXT NOT NULL
);
