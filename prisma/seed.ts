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
  await prisma.food.createMany({
    data: [
      {
        name: "Oats",
        caloriesPer100g: 350,
        proteinPer100g: 12.5,
        carbsPer100g: 67.5,
        fatPer100g: 6.25,
      },
      {
        name: "Milk",
        caloriesPer100g: 64,
        proteinPer100g: 3.6,
        carbsPer100g: 5.2,
        fatPer100g: 3.2,
      },
      // Per Egg nutriton done as 100g
      {
        name: "Egg",
        caloriesPer100g: 80,
        proteinPer100g: 6.5,
        carbsPer100g: 0.5,
        fatPer100g: 5.5,
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
