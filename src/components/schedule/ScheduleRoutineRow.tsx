type RoutineRowProps = {
  intervals: number;
  name: string;
  startTime: string;
  duration: string;
};

export const ScheduleRoutineRow = ({
  intervals,
  name,
  startTime,
  duration,
}: RoutineRowProps) => {
  return (
    <div
      style={{
        gridRow: `span ${intervals} / span ${intervals}`, // alone: grid-row-end: span 2
      }}
      className="flex gap-4 rounded-lg bg-white p-2 shadow-lg"
    >
      <p className="text-sm font-bold text-gray-700">{startTime}</p>
      <p className="flex-1 text-sm text-gray-600">{name}</p>
      <p className="text-sm font-light text-gray-500">{duration}</p>
    </div>
  );
};

//  min-height = 32px (includes padding)
