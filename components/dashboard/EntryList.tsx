import { deleteFoodEntry } from "@/app/actions/deleteFoodEntry";
import { ListItemRow } from "../ui/ListItemRow";
import { Button } from "../ui/Button";

type Entry = {
  id: string;
  grams: number;
  food: {
    name: string;
    caloriesPer100g: number;
    proteinPer100g: number;
    carbsPer100g: number;
    fatPer100g: number;
  };
};

type EntryListProps = {
  entries: Entry[];
};

export function EntryList({ entries }: EntryListProps) {
  return (
    <div className="rounded-xl border p-4">
      <h2 className="mb-4 text-lg font-semibold">Today's Entries</h2>

      <div className="space-y-3">
        {entries.length === 0 && (
          <p className="text-sm text-gray-500">No food logged today.</p>
        )}

        {entries.map((entry) => (
          <ListItemRow
            key={entry.id}
            left={
              <>
                <h3 className="font-medium">{entry.food.name}</h3>

                <p className="text-sm text-gray-600">
                  {((entry.food.caloriesPer100g * entry.grams) / 100).toFixed(
                    0,
                  )}{" "}
                  kcal •{" "}
                  {((entry.food.proteinPer100g * entry.grams) / 100).toFixed(1)}
                  p •{" "}
                  {((entry.food.carbsPer100g * entry.grams) / 100).toFixed(1)}c
                  • {((entry.food.fatPer100g * entry.grams) / 100).toFixed(1)}f
                </p>

                <p className="text-xs text-gray-400">{entry.grams}g</p>
              </>
            }
            right={
              <form action={deleteFoodEntry.bind(null, entry.id)}>
                <Button type="submit" variant="danger" size="sm">
                  Delete
                </Button>
              </form>
            }
          />
        ))}
      </div>
    </div>
  );
}
