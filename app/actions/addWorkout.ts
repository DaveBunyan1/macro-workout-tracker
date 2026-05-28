"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { DEMO_USER_ID } from "@/lib/constants";

export async function addWorkout(formData: FormData) {
  await prisma.workout.create({
    data: {
      userId: DEMO_USER_ID,
      name: formData.get("name") as string,
      date: new Date(),
    },
  });

  revalidatePath("/dashboard");
}
