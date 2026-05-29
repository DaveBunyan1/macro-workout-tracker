type MacroCardProps = {
  label: string;
  current: number;
  target: number;
  unit?: string;
};

export function MacroCard({
  label,
  current,
  target,
  unit = "g",
}: MacroCardProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const remaining = Math.max(target - current, 0);

  return (
    <div className="rounded-xl border p-4 shadow-sm">
      <div className="flex justify-between">
        <h3 className="font-semibold">{label}</h3>
        <span>
          {current}/{target}
          {unit}
        </span>
      </div>

      <div className="mt-3 h-2 rounded bg-gray-200">
        <div
          className="h-2 rounded bg-blue-600"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-gray-300">
        {remaining}
        {unit} remaining
      </p>
    </div>
  );
}
