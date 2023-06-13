type RoutineRowProps = {
  rowSpan: number;
  rowStart: number;
  name: string;
  startTime: string;
  duration: string;
};

export const ScheduleRoutineRow = ({
  rowSpan,
  name,
  startTime,
  duration,
}: RoutineRowProps) => {
  return (
    <div
      style={{
        gridRow: `span ${rowSpan} / span ${rowSpan}`, // alone: grid-row-end: span 2
        // gridRowStart: rowStart,
      }}
      className="flex min-h-[32px] gap-4 rounded-lg bg-white px-4 py-2 shadow-lg"
    >
      <p className="font-bold text-gray-600">{startTime}</p>
      <p className="flex-1 text-gray-600">{name}</p>
      <p className="font-light text-gray-500">{duration}</p>
    </div>
  );
};

//  min-height = 32px (includes padding)
