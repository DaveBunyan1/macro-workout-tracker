import { MacroCard } from "@/components/dashboard/MacroCard";
import { getTodayEntries } from "@/lib/queries/getTodayEntries";
import { EntryList } from "@/components/dashboard/EntryList";
import { FoodEntryForm } from "@/components/dashboard/FoodEntryForm";
import { WorkoutForm } from "@/components/dashboard/WorkoutForm";
import { WorkoutList } from "@/components/dashboard/WorkoutList";
import { getTodayWorkouts } from "@/lib/queries/getTodayWorkouts";
import { CardSection } from "@/components/ui/CardSection";
import { DEMO_USER_ID } from "@/lib/constants";
import { prisma } from "@/lib/prisma";

const targets = {
  calories: 3000,
  protein: 180,
  carbs: 390,
  fat: 80,
};

const DashboardPage = async () => {
  const { entries, totals } = await getTodayEntries(DEMO_USER_ID);

  const workouts = await getTodayWorkouts(DEMO_USER_ID);

  const foods = await prisma.food.findMany();

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-8">
      <h1 className="text-2xl font-bold">Today</h1>

      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <MacroCard
            label="Calories"
            current={totals.calories}
            target={targets.calories}
            unit="kcal"
          />

          <MacroCard
            label="Protein"
            current={totals.protein}
            target={targets.protein}
          />

          <MacroCard
            label="Carbs"
            current={totals.carbs}
            target={targets.carbs}
          />

          <MacroCard label="Fat" current={totals.fat} target={targets.fat} />
        </div>
      </div>
      <CardSection title="Food">
        <FoodEntryForm foods={foods} />
        <EntryList entries={entries} />
      </CardSection>

      <CardSection title="Workouts">
        <WorkoutForm />
        <WorkoutList workouts={workouts} />
      </CardSection>
    </div>
  );
};

export default DashboardPage;
