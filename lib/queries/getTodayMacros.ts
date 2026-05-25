import { prisma } from "@/lib/prisma";

const startOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};

const endOfDay = (date: Date) => {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
};

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
