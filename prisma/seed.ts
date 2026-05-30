import { prisma } from "@/lib/prisma";

const foods = [
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
  {
    name: "Bread",
    caloriesPer100g: 85,
    proteinPer100g: 3.5,
    carbsPer100g: 16,
    fatPer100g: 0.75,
  },
  {
    name: "Cheese",
    caloriesPer100g: 366.67,
    proteinPer100g: 23.33,
    carbsPer100g: 3.33,
    fatPer100g: 30,
  },
  {
    name: "Beans",
    caloriesPer100g: 104,
    proteinPer100g: 5.6,
    carbsPer100g: 21.6,
    fatPer100g: 0.4,
  },
  {
    name: "Weight Gainer",
    caloriesPer100g: 362.96,
    proteinPer100g: 21.48,
    carbsPer100g: 68.89,
    fatPer100g: 2.22,
  },
  {
    name: "Peanut Butter",
    caloriesPer100g: 90 * (100 / 15),
    proteinPer100g: 4 * (100 / 15),
    carbsPer100g: 3 * (100 / 15),
    fatPer100g: 7 * (100 / 15),
  },
];

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
  for (const food of foods) {
    await prisma.food.upsert({
      where: { name: food.name },
      update: {},
      create: food,
    });
  }

  // -----------------------
  // 3. WORKOUTS
  // -----------------------

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
