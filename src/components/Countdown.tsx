import { useState, type SVGAttributes } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

type CountdownProps = {
  isPlaying: boolean;
  duration: number;
};

export const Countdown = ({ duration }: CountdownProps) => {
  const [timerIsPlaying, setTimerIsPlaying] = useState(false);

  // TODO: Add a form to control the durations of work and breaks

  return (
    <div className="mb-1 flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-center">
        <CountdownCircleTimer
          size={500}
          isPlaying={timerIsPlaying}
          duration={duration}
          colors={["#4ade80", "#4ade80"]}
          // TODO: Make this dynamic
          colorsTime={[duration, duration / 2]}
          isSmoothColorTransition={true}
          onComplete={() => {
            return { shouldRepeat: true, delay: 0 };
          }}
        >
          {({ remainingTime }) => formatRemainingTime(remainingTime)}
        </CountdownCircleTimer>
      </div>

      <div className="grid grid-cols-3 items-baseline">
        <p className="font-light text-gray-500">Interval: 0/4</p>
        <div className="flex justify-center gap-2">
          <StartButton
            className="my-1 h-8 text-green-400 hover:cursor-pointer"
            onClick={() => setTimerIsPlaying(true)}
          />
          <StopButton
            className="my-1 h-8 text-gray-500 hover:cursor-pointer"
            onClick={() => setTimerIsPlaying(false)}
          />
        </div>
        <p className="text-end font-light text-gray-500">Breaks: 0/2</p>
      </div>
    </div>
  );
};

const formatRemainingTime = (remainingTime: number) => {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return (
    <p className="text-5xl text-gray-500">{`${pad(minutes)}:${pad(
      seconds
    )}`}</p>
  );
};

function StartButton(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
      />
    </svg>
  );
}

function StopButton(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
      />
    </svg>
  );
}

export function BreakButton(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
      />
    </svg>
  );
}

export function RestartIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  );
}
