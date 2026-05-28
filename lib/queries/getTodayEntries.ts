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

export const getTodayEntries = async (userId: string) => {
  const now = new Date();

  return prisma.foodEntry.findMany({
    where: {
      userId,
      date: {
        gte: startOfDay(now),
        lte: endOfDay(now),
      },
    },
    orderBy: {
      date: "desc",
    },
  });
};
