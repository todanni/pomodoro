import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export const TimerDateTime = () => {
  const [date, setDate] = useState<DateTime | null>(null);

  useEffect(() => {
    setDate(DateTime.now());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setDate(DateTime.now()), 60 * 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  // TODO: hacky stuff because of hydration errors I can't be bothered to fix
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTimeString = (format: any) => {
    if (date) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return date.toLocaleString(format);
    }
    return "";
  };
  return (
    <div className="flex items-end justify-between">
      <p className="text-lg font-bold text-gray-400">
        {getTimeString(DateTime.DATE_HUGE)}
      </p>
      <p className="text-lg font-bold text-gray-400">
        {getTimeString(DateTime.TIME_24_SIMPLE)}
      </p>
    </div>
  );
};
