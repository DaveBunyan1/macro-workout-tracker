"use client";

import { addWorkout } from "@/app/actions/addWorkout";
import { Button } from "../ui/Button";

export function WorkoutForm() {
  return (
    <form action={addWorkout} className="space-y-3 rounded-xl border p-4">
      <h2 className="text-lg font-semibold">Add Workout</h2>

      <input
        name="name"
        placeholder="Workout name (e.g. Push Day)"
        className="w-full rounded border p-2"
      />
      <Button type="submit">Add Workout</Button>
    </form>
  );
}
