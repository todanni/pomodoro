import { DateTime } from "luxon";
import { calculateProgress, type ScheduledRoutine } from "~/schemas/schedule";

type ScheduleCurrentRoutineProps = {
  routine: ScheduledRoutine | null | undefined;
};

export const ScheduleCurrentRoutine = ({
  routine,
}: ScheduleCurrentRoutineProps) => {
  return (
    <div className="flex flex-col">
      <div className="mb-1 flex items-baseline justify-between">
        <p className="text-lg font-semibold tracking-wide text-gray-700">
          {routine?.name}
        </p>
      </div>

      <div className="h-2.5 w-full rounded-full bg-gray-200">
        {routine && (
          <div
            className="h-2.5 rounded-full bg-blue-500"
            style={{
              width: `${calculateProgress(
                routine?.startTime,
                routine?.endTime
              )}%`,
            }}
          />
        )}
      </div>
      {/* Placeholder description */}
      <p className="my-4 font-light text-gray-500">
        Daily meetings period or in the case of no meetings day, use the time to
        learn a part of the system.
      </p>
      <p className="mb-2 mt-4 font-bold text-gray-700">Routine tasks</p>
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 rounded-lg border-gray-300 text-blue-400"
          />
          <p className="text-gray-600">Review PRs</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5 rounded-lg border-gray-300 text-blue-400"
          />
          <p className="text-gray-600">Pick a learning goal for the day</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="font-light text-gray-400">
          Started: {routine?.startTime.toLocaleString(DateTime.TIME_24_SIMPLE)}
        </p>
        <p className="font-light text-gray-400">
          Ends: {routine?.endTime.toLocaleString(DateTime.TIME_24_SIMPLE)}
        </p>
      </div>
    </div>
  );
};
