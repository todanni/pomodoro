import { DateTime } from "luxon";
import { formatRemainingTime, type ScheduledRoutine } from "~/schemas/schedule";

type ScheduleNextRoutineProps = {
  routine: ScheduledRoutine | null | undefined;
};

export const ScheduleNextRoutine = ({ routine }: ScheduleNextRoutineProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <p className="text-lg font-semibold tracking-wide text-gray-700">
          Coming up next
        </p>
        <p className="text-blue-500">
          Starting at:{" "}
          {routine?.startTime.toLocaleString(DateTime.TIME_24_SIMPLE)}
        </p>
      </div>
      <div className="flex items-baseline justify-between">
        <p className="text-lg text-gray-400">
          {routine ? routine.name : "No next routine"}
        </p>
        <p className="font-light text-gray-400">
          {routine ? formatRemainingTime(routine?.startTime) : ""}
        </p>
      </div>
    </div>
  );
};
