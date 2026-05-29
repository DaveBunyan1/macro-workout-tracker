"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { DEMO_USER_ID } from "@/lib/constants";

export async function addFoodEntry(formData: FormData) {
  const foodId = formData.get("foodId") as string;
  const grams = Number(formData.get("grams"));

  await prisma.foodEntry.create({
    data: {
      userId: DEMO_USER_ID,
      foodId,
      grams,
      date: new Date(),
    },
  });

  revalidatePath("/dashboard");
}
