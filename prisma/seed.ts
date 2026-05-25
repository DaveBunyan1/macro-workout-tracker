import { prisma } from "@/lib/prisma";

async function main() {
  // -----------------------
  // 1. Create / reuse user
  // -----------------------
  const user = await prisma.user.upsert({
    where: {
      id: "demo-user",
    },
    update: {},
    create: {
      id: "demo-user",
    },
  });

  // Helper dates
  const today = new Date();
  const day1 = new Date();
  day1.setDate(today.getDate() - 2);

  const day2 = new Date();
  day2.setDate(today.getDate() - 1);

  const day3 = new Date(); // today

  // -----------------------
  // 2. FOOD ENTRIES
  // -----------------------
  await prisma.foodEntry.createMany({
    data: [
      // DAY 1
      {
        userId: user.id,
        date: day1,
        name: "Oats with banana",
        calories: 350,
        protein: 10,
        carbs: 60,
        fat: 8,
      },
      {
        userId: user.id,
        date: day1,
        name: "Chicken rice bowl",
        calories: 650,
        protein: 55,
        carbs: 70,
        fat: 18,
      },

      // DAY 2
      {
        userId: user.id,
        date: day2,
        name: "Eggs and toast",
        calories: 420,
        protein: 22,
        carbs: 30,
        fat: 22,
      },
      {
        userId: user.id,
        date: day2,
        name: "Salmon and potatoes",
        calories: 700,
        protein: 45,
        carbs: 50,
        fat: 30,
      },

      // DAY 3 (today)
      {
        userId: user.id,
        date: day3,
        name: "Greek yogurt + honey",
        calories: 250,
        protein: 20,
        carbs: 25,
        fat: 5,
      },
      {
        userId: user.id,
        date: day3,
        name: "Chicken wrap",
        calories: 500,
        protein: 40,
        carbs: 45,
        fat: 15,
      },
    ],
  });

  // -----------------------
  // 3. WORKOUTS
  // -----------------------

  const workout1 = await prisma.workout.create({
    data: {
      userId: user.id,
      date: day1,
      name: "Push Day",
    },
  });

  const workout2 = await prisma.workout.create({
    data: {
      userId: user.id,
      date: day2,
      name: "Pull Day",
    },
  });

  const workout3 = await prisma.workout.create({
    data: {
      userId: user.id,
      date: day3,
      name: "Leg Day",
    },
  });

  // -----------------------
  // 4. EXERCISE SETS
  // -----------------------

  await prisma.exerciseSet.createMany({
    data: [
      // PUSH DAY
      {
        workoutId: workout1.id,
        exercise: "Bench Press",
        setNumber: 1,
        reps: 8,
        weight: 80,
      },
      {
        workoutId: workout1.id,
        exercise: "Bench Press",
        setNumber: 2,
        reps: 6,
        weight: 85,
      },
      {
        workoutId: workout1.id,
        exercise: "Incline DB Press",
        setNumber: 1,
        reps: 10,
        weight: 25,
      },

      // PULL DAY
      {
        workoutId: workout2.id,
        exercise: "Pull-ups",
        setNumber: 1,
        reps: 8,
        weight: 0,
      },
      {
        workoutId: workout2.id,
        exercise: "Barbell Row",
        setNumber: 1,
        reps: 8,
        weight: 70,
      },

      // LEG DAY
      {
        workoutId: workout3.id,
        exercise: "Squat",
        setNumber: 1,
        reps: 8,
        weight: 100,
      },
      {
        workoutId: workout3.id,
        exercise: "Romanian Deadlift",
        setNumber: 1,
        reps: 10,
        weight: 90,
      },
    ],
  });

  // -----------------------
  // 5. WEIGHT LOGS
  // -----------------------
  await prisma.weightLog.createMany({
    data: [
      {
        userId: user.id,
        date: day1,
        weight: 75.8,
      },
      {
        userId: user.id,
        date: day2,
        weight: 75.4,
      },
      {
        userId: user.id,
        date: day3,
        weight: 75.2,
      },
    ],
  });

  console.log("🌱 Seed complete");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
