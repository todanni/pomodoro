import { type Task } from "@prisma/client";
import { type SVGAttributes } from "react";
import { CardContainer } from "../containers/CardContainer";

export type CurrentTaskProps = {
  task: Task | null;
};

export const CurrentTask = ({ task }: CurrentTaskProps) => {
  return (
    <CardContainer>
      <div className="flex items-center justify-center gap-2">
        <CurrentTaskIcon className="h-6 w-6 text-green-300" />
        {task && (
          <p className="max-w-[85%] truncate text-center text-lg font-semibold text-gray-600">
            {task.name}
          </p>
        )}
        {!task && (
          <p className="text-center text-lg font-light text-gray-400">
            Click the start button on the task you are currently working on...
          </p>
        )}
      </div>
    </CardContainer>
  );
};

export function CurrentTaskIcon(props: SVGAttributes<SVGElement>) {
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
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
      />
    </svg>
  );
}
