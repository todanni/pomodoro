import { Button } from "@todanni/ui";
import { type NextPage } from "next";
import { useState } from "react";
import {
  CountdownCircleTimer,
  type MultipleColors,
} from "react-countdown-circle-timer";

const multipleColors: MultipleColors = {
  colors: ["#059669", "#10b981", "#34d399", "#6ee7b7", "#6ee7b7"],
  colorsTime: [9, 7, 5, 2, 0],
};

type TimerInterval = {
  isPlaying: boolean;
  duration: number;
  name: string;
  colors: MultipleColors;
};

const intervals: TimerInterval[] = [
  {
    isPlaying: false,
    duration: 25 * 60,
    name: "Work",
    colors: multipleColors,
  },
  {
    isPlaying: false,
    duration: 5 * 60,
    name: "Break",
    colors: multipleColors,
  },
  {
    isPlaying: false,
    duration: 25 * 60,
    name: "Work",
    colors: multipleColors,
  },
  {
    isPlaying: false,
    duration: 5 * 60,
    name: "Break",
    colors: multipleColors,
  },
];

const Countdown: NextPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentInterval, setCurrentInterval] = useState(0);

  const getCurrentInterval = () => {
    const interval = intervals[currentInterval];
    if (!interval) {
      return {
        isPlaying: false,
        duration: 9,
        name: "Done!",
        ...multipleColors,
      };
    }

    if (interval) {
      interval.isPlaying = isPlaying;
    }
    return {
      ...interval,
      ...multipleColors,
    };
  };

  const onStartClick = () => {
    if (currentInterval === intervals.length) {
      setCurrentInterval(0);
    }
    setIsPlaying(true);
  };

  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <CountdownCircleTimer
          {...getCurrentInterval()}
          size={500}
          onComplete={() => {
            setCurrentInterval((prevInterval) => prevInterval + 1);
            return { shouldRepeat: true };
          }}
        >
          {({ remainingTime }) =>
            formatRemainingTime(remainingTime, getCurrentInterval().name)
          }
        </CountdownCircleTimer>
        <Button text="Pause" colour="red" onClick={() => setIsPlaying(false)} />
        <Button
          text={currentInterval === intervals.length ? "Restart" : "Start"}
          colour="green"
          onClick={() => onStartClick()}
        />
        <Button
          text="Next"
          colour="blue"
          onClick={() => setCurrentInterval((prevInterval) => prevInterval + 1)}
        />
      </main>
    </>
  );
};

const formatRemainingTime = (remainingTime: number, name: string) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <p className="text-5xl text-gray-500">{`${pad(minutes)}:${pad(
        seconds
      )}`}</p>
      <p className="text-3xl font-thin text-green-500">{name}</p>
    </div>
  );
};

export default Countdown;
