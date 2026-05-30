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
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
          {label}
        </h3>

        <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          {current.toFixed(0)} / {target}
          {unit}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-3 h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className="h-2 rounded-full bg-linear-to-r from-blue-500 to-indigo-900 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Footer */}
      <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
        {remaining.toFixed(0)}
        {unit} remaining
      </div>
    </div>
  );
}
