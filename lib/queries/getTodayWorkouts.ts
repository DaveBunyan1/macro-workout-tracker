import { prisma } from "@/lib/prisma";
import { startOfDay, endOfDay } from "../date";

export async function getTodayWorkouts(userId: string) {
  const now = new Date();

  return prisma.workout.findMany({
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
}
