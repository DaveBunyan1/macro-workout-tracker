"use client";

import { addFoodEntry } from "@/app/actions/addFoodEntry";

export function FoodEntryForm() {
  return (
    <form action={addFoodEntry} className="space-y-4 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Add Food Entry</h2>

      <input
        name="name"
        placeholder="Food name"
        className="w-full rounded border p-2"
      />

      <input
        name="calories"
        type="number"
        placeholder="Calories"
        className="w-full rounded border p-2"
      />

      <input
        name="protein"
        type="number"
        placeholder="Protein (g)"
        className="w-full rounded border p-2"
      />

      <input
        name="carbs"
        type="number"
        placeholder="Carbs (g)"
        className="w-full rounded border p-2"
      />

      <input
        name="fat"
        type="number"
        placeholder="Fat (g)"
        className="w-full rounded border p-2"
      />

      <button type="submit" className="rounded bg-black px-4 py-2 text-white">
        Add Entry
      </button>
    </form>
  );
}
