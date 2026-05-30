-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ExerciseEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "workoutId" TEXT NOT NULL,
    "templateExerciseId" TEXT,
    "exercise" TEXT NOT NULL,
    "setNumber" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "weight" REAL,
    CONSTRAINT "ExerciseEntry_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ExerciseEntry_templateExerciseId_fkey" FOREIGN KEY ("templateExerciseId") REFERENCES "WorkoutTemplateExercise" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ExerciseEntry" ("exercise", "id", "reps", "setNumber", "templateExerciseId", "weight", "workoutId") SELECT "exercise", "id", "reps", "setNumber", "templateExerciseId", "weight", "workoutId" FROM "ExerciseEntry";
DROP TABLE "ExerciseEntry";
ALTER TABLE "new_ExerciseEntry" RENAME TO "ExerciseEntry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
