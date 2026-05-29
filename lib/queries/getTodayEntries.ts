import { prisma } from "@/lib/prisma";

import { startOfDay, endOfDay } from "@/lib/date";

export async function getTodayEntries(userId: string) {
  const now = new Date();

  const entries = await prisma.foodEntry.findMany({
    where: {
      userId: userId,
      date: {
        gte: startOfDay(now),
        lte: endOfDay(now),
      },
    },
    include: {
      food: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  const initial = {
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  };

  const totals = entries.reduce((acc, entry) => {
    const factor = entry.grams / 100;

    acc.calories += entry.food.caloriesPer100g * factor;
    acc.protein += entry.food.proteinPer100g * factor;
    acc.carbs += entry.food.carbsPer100g * factor;
    acc.fat += entry.food.fatPer100g * factor;

    return acc;
  }, initial);

  return {
    entries,
    totals,
  };
}
