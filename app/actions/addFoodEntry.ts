"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function addFoodEntry(formData: FormData) {
  await prisma.foodEntry.create({
    data: {
      userId: "demo-user",
      name: formData.get("name") as string,
      calories: Number(formData.get("calories")),
      protein: Number(formData.get("protein")),
      carbs: Number(formData.get("carbs")),
      fat: Number(formData.get("fat")),
      date: new Date(),
    },
  });

  revalidatePath("/dashboard");
}
