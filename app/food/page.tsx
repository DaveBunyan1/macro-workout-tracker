import { EntryList } from "@/components/dashboard/EntryList";
import { FoodEntryForm } from "@/components/dashboard/FoodEntryForm";
import { CardSection } from "@/components/ui/CardSection";
import { DEMO_USER_ID } from "@/lib/constants";
import { getTodayEntries } from "@/lib/queries/getTodayEntries";
import { prisma } from "@/lib/prisma";
import { MacroCard } from "@/components/dashboard/MacroCard";

const targets = {
  calories: 3000,
  protein: 180,
  carbs: 390,
  fat: 80,
};

const FoodPage = async () => {
  const { entries, totals } = await getTodayEntries(DEMO_USER_ID);
  const foods = await prisma.food.findMany();

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-6 space-y-8">
      <h1 className="text-2xl font-bold">Food</h1>

      {/* Add food */}
      <CardSection title="Add Food">
        <FoodEntryForm foods={foods} />
      </CardSection>

      {/* Today summary (this is your "Macro section") */}
      <CardSection title="Today">
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
      </CardSection>

      {/* Entries */}
      <CardSection title="Entries">
        <EntryList entries={entries} />
      </CardSection>
    </div>
  );
};

export default FoodPage;
