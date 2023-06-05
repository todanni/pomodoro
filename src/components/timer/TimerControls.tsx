import { type SVGAttributes } from "react";

type TimerControlsProps = {
  onStart: () => void;
  onStop: () => void;
};

export const TimerControls = ({ onStart, onStop }: TimerControlsProps) => {
  return (
    <div className="flex items-center justify-center">
      <StartButton
        className="h-8 text-green-400 hover:cursor-pointer"
        onClick={() => onStart()}
      />
      <StopButton
        className="h-8 text-gray-500 hover:cursor-pointer"
        onClick={() => onStop()}
      />
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
