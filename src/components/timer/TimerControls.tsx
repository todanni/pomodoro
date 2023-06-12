import { type SVGAttributes } from "react";
import useSound from "use-sound";

type TimerControlsProps = {
  remainingTime: number;
  name: string;
  onStart: () => void;
  onStop: () => void;
  isPlaying: boolean;
};

export const TimerControls = ({
  remainingTime,
  name,
  isPlaying,
  onStart,
  onStop,
}: TimerControlsProps) => {
  const [play] = useSound("/click.mp3", { volume: 0.1 });

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
      <div className="flex items-center justify-center">
        {isPlaying ? (
          <StopButton
            className="h-8 text-gray-500 hover:cursor-pointer"
            onClick={() => {
              play();
              onStop();
            }}
          />
        ) : (
          <StartButton
            className="h-8 text-green-400 hover:cursor-pointer"
            onClick={() => {
              play();
              onStart();
            }}
          />
        )}
      </div>
    </div>
  );
};

function StartButton(props: SVGAttributes<SVGElement>) {
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
      strokeWidth={2}
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
