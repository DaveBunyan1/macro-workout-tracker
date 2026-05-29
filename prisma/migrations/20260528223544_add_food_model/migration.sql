/*
  Warnings:

  - You are about to drop the column `calories` on the `FoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `carbs` on the `FoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `fat` on the `FoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `FoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `protein` on the `FoodEntry` table. All the data in the column will be lost.
  - Added the required column `foodId` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grams` to the `FoodEntry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "caloriesPer100g" REAL NOT NULL,
    "proteinPer100g" REAL NOT NULL,
    "carbsPer100g" REAL NOT NULL,
    "fatPer100g" REAL NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FoodEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date" DATETIME NOT NULL,
    "foodId" TEXT NOT NULL,
    "grams" REAL NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "FoodEntry_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "Food" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "FoodEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_FoodEntry" ("createdAt", "date", "id", "userId") SELECT "createdAt", "date", "id", "userId" FROM "FoodEntry";
DROP TABLE "FoodEntry";
ALTER TABLE "new_FoodEntry" RENAME TO "FoodEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
