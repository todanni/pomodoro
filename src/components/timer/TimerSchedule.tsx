export const TimerShedule = () => {
  return (
    <div className="mb-4 flex items-center justify-between gap-2 border-y-[0.5px] p-2 font-semibold text-gray-600">
      <p className="">Duration: 25:00</p>
      <p className="">Intervals: 4</p>
      <p className="">Break: 5:00</p>

      {/* <AddIcon className="h-6 w-6 rounded-lg bg-green-400 text-white" /> */}
    </div>
  );
};

import { type SVGAttributes } from "react";

export function AddIcon(props: SVGAttributes<SVGElement>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
}
