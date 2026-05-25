import { getTodayMacros } from "@/lib/queries/getTodayMacros";

const DashboardPage = async () => {
  const userId = "demo-user"; // temporary until auth

  const macros = await getTodayMacros(userId);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Today</h1>

      <div className="mt-4 space-y-2">
        <p>Calories: {macros.calories}</p>
        <p>Protein: {macros.protein}g</p>
        <p>Carbs: {macros.carbs}g</p>
        <p>Fat: {macros.fat}g</p>
      </div>
    </div>
  );
};

export default DashboardPage;
