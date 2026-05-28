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
            <h3 className="font-medium">{entry.name}</h3>

            <p className="text-sm text-gray-600">
              {entry.calories} kcal • {entry.protein}p • {entry.carbs}c •{" "}
              {entry.fat}f
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
