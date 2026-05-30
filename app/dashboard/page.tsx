import { MacroCard } from "@/components/dashboard/MacroCard";
import { getTodayEntries } from "@/lib/queries/getTodayEntries";
import { getTodayWorkouts } from "@/lib/queries/getTodayWorkouts";
import { CardSection } from "@/components/ui/CardSection";
import { DEMO_USER_ID } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

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
    <div className="mx-auto w-full max-w-6xl px-6 py-6 space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold leading-tight">Today</h1>
        <p className="text-sm text-zinc-500 leading-none">Saturday, May 30</p>
      </div>

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
      <CardSection title="Food Today">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          5 entries logged
        </div>

        <div className="mt-1 text-lg font-medium">1,840 / 3,000 kcal</div>

        <Link className="mt-3 text-blue-600 text-sm" href="/food">
          View food log →
        </Link>
      </CardSection>

      <CardSection title="Workouts Today">
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Workout A completed
        </div>

        <div className="mt-1 text-lg font-medium">18 sets logged</div>

        <Link className="mt-3 text-blue-600 text-sm" href="/workouts">
          View workouts →
        </Link>
      </CardSection>
    </div>
  );
};

export default DashboardPage;
