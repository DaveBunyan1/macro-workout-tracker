import { deleteFoodEntry } from "@/app/actions/deleteFoodEntry";

type Entry = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

type EntryListProps = {
  entries: Entry[];
};

export function EntryList({ entries }: EntryListProps) {
  return (
    <div className="rounded-xl border p-4">
      <h2 className="mb-4 text-lg font-semibold">Today's Entries</h2>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="rounded-lg border p-3">
            <div className="flex items-start justify-between gap-4 rounded-lg border p-3">
              <div>
                <h3 className="font-medium">{entry.name}</h3>

                <p className="text-sm text-gray-600">
                  {entry.calories} kcal • {entry.protein}p • {entry.carbs}c •{" "}
                  {entry.fat}f
                </p>
              </div>
              <form action={deleteFoodEntry.bind(null, entry.id)}>
                <button
                  type="submit"
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
