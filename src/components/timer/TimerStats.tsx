import { type SVGAttributes } from "react";
import { CardContainer } from "../containers/CardContainer";

type TimerStatsProps = {
  currentInterval: number;
  intervals: number;
};

export const TimerStats = ({ currentInterval, intervals }: TimerStatsProps) => {
  return (
    <CardContainer>
      <div className="grid grid-cols-3 justify-items-center font-semibold text-gray-600">
        <div className="flex items-center gap-2">
          <ClockIcon className="h-7 w-7 rounded-full border-2 border-green-400 bg-green-100 p-0.5  text-green-400" />
          <p>Duration: 25:00</p>
        </div>
        <div className="flex items-center gap-2">
          <BookOpenIcon className="h-7 w-7 rounded-full border-2 border-green-400 bg-green-100 p-0.5  text-green-400" />
          <p>
            Intervals: {currentInterval + 1}/{intervals}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BellAlertIcon className="h-7 w-7 rounded-full border-2 border-green-400 bg-green-100 p-0.5  text-green-400" />
          <p>Break: 5:00</p>
        </div>
      </div>
    </CardContainer>
  );
};

function BellAlertIcon(props: SVGAttributes<SVGElement>) {
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

function BookOpenIcon(props: SVGAttributes<SVGElement>) {
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
        d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
      />
    </svg>
  );
}

function ClockIcon(props: SVGAttributes<SVGElement>) {
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
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
