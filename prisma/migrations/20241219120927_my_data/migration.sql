/*
  Warnings:

  - You are about to drop the `HitoricalData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "HitoricalData";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "HistoricalData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timestamp" DATETIME NOT NULL,
    "volt" REAL NOT NULL,
    "air" REAL NOT NULL,
    "current" REAL NOT NULL,
    "ActivePower" REAL NOT NULL,
    "PowerFactor" REAL NOT NULL,
    "EnergyConsumed" REAL NOT NULL,
    "FeedCapCarre" REAL NOT NULL,
    "FeedCapRound" REAL NOT NULL
);
