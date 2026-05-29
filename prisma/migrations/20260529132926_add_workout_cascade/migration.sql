-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workoutId" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    CONSTRAINT "ExerciseSet_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseSet" ("exercise", "id", "reps", "setNumber", "weight", "workoutId") SELECT "exercise", "id", "reps", "setNumber", "weight", "workoutId" FROM "ExerciseSet";
DROP TABLE "ExerciseSet";
ALTER TABLE "new_ExerciseSet" RENAME TO "ExerciseSet";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
