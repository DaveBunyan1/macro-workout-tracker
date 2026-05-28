"use client";

import { addWorkout } from "@/app/actions/addWorkout";

export function WorkoutForm() {
  return (
    <form action={addWorkout} className="space-y-3 rounded-xl border p-4">
      <h2 className="text-lg font-semibold">Add Workout</h2>

      <input
        name="name"
        placeholder="Workout name (e.g. Push Day)"
        className="w-full rounded border p-2"
      />

      <button type="submit" className="rounded bg-black px-4 py-2 text-white">
        Add Workout
      </button>
    </form>
  );
}
