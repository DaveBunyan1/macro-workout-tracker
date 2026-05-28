"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteWorkout(id: string) {
  await prisma.workout.delete({
    where: { id },
  });

  revalidatePath("/dashboard");
}
