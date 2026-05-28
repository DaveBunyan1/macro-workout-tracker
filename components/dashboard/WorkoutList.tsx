import { ListItemRow } from "@/components/ui/ListItemRow";
import { deleteWorkout } from "@/app/actions/deleteWorkout";

type Workout = {
  id: string;
  name: string;
  date: Date;
};

type WorkoutListProps = {
  workouts: Workout[];
};

export function WorkoutList({ workouts }: WorkoutListProps) {
  return (
    <div className="rounded-xl border p-4">
      <h2 className="mb-4 text-lg font-semibold">Today's Workouts</h2>

      <div className="space-y-3">
        {workouts.length === 0 && (
          <p className="text-sm text-gray-500">No workouts logged today.</p>
        )}

        {workouts.map((workout) => (
          <ListItemRow
            key={workout.id}
            left={
              <>
                <h3 className="font-medium">{workout.name}</h3>
                <p className="text-sm text-gray-500">
                  {new Date(workout.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </>
            }
            right={
              <form action={deleteWorkout.bind(null, workout.id)}>
                <button
                  type="submit"
                  className="text-sm text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </form>
            }
          />
        ))}
      </div>
    </div>
  );
}
