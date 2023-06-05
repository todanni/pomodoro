import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { TimerControls } from "./TimerControls";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

type TimerProps = {
  isPlaying: boolean;
  duration: number;
  intervalName: string;
  onIntervalEnd: () => void;
};

export const Timer = ({ isPlaying, duration, intervalName }: TimerProps) => {
  const [date, setDate] = useState(DateTime.now());

  useEffect(() => {
    const timer = setInterval(() => setDate(DateTime.now()), 60 * 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  return (
    <div className="flex flex-col justify-between rounded-xl border-t-2 border-t-gray-100 bg-white p-2.5 shadow-xl">
      <div className="flex items-end justify-between">
        <p className="text-lg font-bold text-gray-400">
          {date.toLocaleString(DateTime.DATE_HUGE)}
        </p>
        <p className="text-lg font-bold text-gray-400">
          {date.toLocaleString(DateTime.TIME_24_SIMPLE)}
        </p>
      </div>
      <div className="flex min-w-[500px] justify-center">
        <CountdownCircleTimer
          trailColor="#f0fdf4"
          size={500}
          isPlaying={isPlaying}
          duration={duration * 60}
          colors={["#4ade80", "#fcd34d"]}
          colorsTime={[duration, duration / 2]}
          isSmoothColorTransition={true}
          onComplete={() => onComplete()}
        >
          {({ remainingTime }) =>
            formatRemainingTime(remainingTime, intervalName)
          }
        </CountdownCircleTimer>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-gray-500">
          <span className="font-semibold tracking-wide">{"Start: "}</span>
          {date.toLocaleString(DateTime.TIME_SIMPLE)}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold tracking-wide">{"End: "}</span>
          {date.toLocaleString(DateTime.TIME_SIMPLE)}
        </p>
      </div>
    </div>
  );
};

const onComplete = () => {
  return {
    newInitialRemainingTime: 1 * 60,
    shouldRepeat: true,
    delay: 0,
  };
};

const formatRemainingTime = (remainingTime: number, name: string) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");
  const format = () => `${pad(minutes)}:${pad(seconds)}`;

  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-full bg-white p-16 shadow-xl">
      <p className="text-3xl font-semibold tracking-wider text-green-400">
        {name}
      </p>
      <p className="px-1 text-5xl proportional-nums text-gray-500">
        {format()}
      </p>
      <TimerControls
        onStart={() => console.log("start")}
        onStop={() => console.log("start")}
      />
    </div>
  );
};
