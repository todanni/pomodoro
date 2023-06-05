import { type DateTime } from "luxon";

type TimerStartEndProps = {
  start: DateTime;
  end: DateTime;
};

export const TimerStartEnd = ({}: TimerStartEndProps) => {
  return (
    <div className="flex items-end justify-between">
      <p className="text-gray-500">
        <span className="font-semibold tracking-wide">{"Start: "}</span>
        {/* {start.toLocaleString(DateTime.TIME_SIMPLE)} */}
      </p>
      <p className="text-gray-500">
        <span className="font-semibold tracking-wide">{"End: "}</span>
        {/* {end.toLocaleString(DateTime.TIME_SIMPLE)} */}
      </p>
    </div>
  );
};
