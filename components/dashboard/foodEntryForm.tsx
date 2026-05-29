"use client";

import { addFoodEntry } from "@/app/actions/addFoodEntry";

type Food = {
  id: string;
  name: string;
};

export function FoodEntryForm({ foods }: { foods: Food[] }) {
  return (
    <form action={addFoodEntry} className="space-y-4 rounded-lg border p-4">
      <h2 className="text-lg font-semibold">Add Food Entry</h2>

      <select
        name="foodId"
        className="w-full rounded border p-2"
        defaultValue=""
      >
        <option value="" disabled>
          Select food
        </option>

        {foods.map((food) => (
          <option key={food.id} value={food.id} className="text-black">
            {food.name}
          </option>
        ))}
      </select>

      <input
        name="grams"
        type="number"
        placeholder="Grams"
        className="w-full rounded border p-2"
      />

      <button type="submit" className="rounded bg-black px-4 py-2 text-white">
        Add Entry
      </button>
    </form>
  );
}
