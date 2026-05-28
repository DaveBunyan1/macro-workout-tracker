import { MacroCard } from "@/components/dashboard/MacroCard";
import { getTodayMacros } from "@/lib/queries/getTodayMacros";
import { getTodayEntries } from "@/lib/queries/getTodayEntries";
import { EntryList } from "@/components/dashboard/EntryList";
import { FoodEntryForm } from "@/components/dashboard/FoodEntryForm";
import { WorkoutForm } from "@/components/dashboard/WorkoutForm";
import { WorkoutList } from "@/components/dashboard/WorkoutList";
import { getTodayWorkouts } from "@/lib/queries/getTodayWorkouts";
import { CardSection } from "@/components/ui/CardSection";

const targets = {
  calories: 2200,
  protein: 180,
  carbs: 250,
  fat: 70,
};

const DashboardPage = async () => {
  const userId = "demo-user"; // temporary until auth

  const macros = await getTodayMacros(userId);

  const entries = await getTodayEntries(userId);

  const workouts = await getTodayWorkouts(userId);

  return (
    <div className="mx-auto max-w-5xl p-6 space-y-8">
      <h1 className="text-2xl font-bold">Today</h1>

      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <MacroCard
            label="Calories"
            current={macros.calories}
            target={targets.calories}
            unit="kcal"
          />

          <MacroCard
            label="Protein"
            current={macros.protein}
            target={targets.protein}
          />

          <MacroCard
            label="Carbs"
            current={macros.carbs}
            target={targets.carbs}
          />

          <MacroCard label="Fat" current={macros.fat} target={targets.fat} />
        </div>
      </div>
      <CardSection title="Food">
        <FoodEntryForm />
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
