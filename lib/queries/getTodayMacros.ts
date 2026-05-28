import { prisma } from "@/lib/prisma";
import { endOfDay, startOfDay } from "../date";

export const getTodayMacros = async (userId: string) => {
  const now = new Date();

  const entries = await prisma.foodEntry.findMany({
    where: {
      userId,
      date: {
        gte: startOfDay(now),
        lte: endOfDay(now),
      },
    },
  });

  const totals = entries.reduce(
    (acc, entry) => {
      acc.calories += entry.calories;
      acc.protein += entry.protein;
      acc.carbs += entry.carbs;
      acc.fat += entry.fat;
      return acc;
    },
    {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
    },
  );

  return totals;
};
