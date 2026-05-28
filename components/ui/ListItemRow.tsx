export function ListItemRow({
  left,
  right,
}: {
  left: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div>{left}</div>
      {right}
    </div>
  );
}
