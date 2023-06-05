/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { type Task } from "@prisma/client";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { CurrentTask } from "~/components/task/CurrentTask";
import { TaskCreateForm } from "~/components/task/TaskCreateForm";
import { TasksList } from "~/components/task/TasksList";
import { Timer } from "~/components/timer/Timer";
import { api } from "~/utils/api";
import logo from "../../public/logo.png";

type Interval = {
  duration: number;
  name: string;
};

const intervals: Interval[] = [
  { duration: 25, name: "Work" },
  { duration: 5, name: "Break" },
  { duration: 25, name: "Work" },
  { duration: 5, name: "Break" },
  { duration: 25, name: "Work" },
  { duration: 5, name: "Break" },
  { duration: 25, name: "Work" },
];

const Home: NextPage = () => {
  const [currentInterval, setCurrentInterval] = useState(0);
  const [timerIsPlaying, setTimerIsPlaying] = useState(true);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const { data: tasks } = api.tasks.list.useQuery();

  return (
    <>
      <Head>
        <title>Pomodoro | ToDanni</title>
        <meta name="description" content="ToDanni Pomodoro timer with tasks." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col items-center gap-4 bg-gray-50">
        <Image
          src={logo}
          alt="ToDanni Logo"
          className="mt-4 h-8 object-scale-down"
        />
        <div className="flex h-full flex-col gap-4 px-4">
          <div className="grid grid-cols-3 justify-items-center rounded-xl bg-white p-2 font-semibold text-gray-600 shadow-xl">
            <div className="flex items-center gap-2">
              <ClockIcon className="h-7 w-7 rounded-full border-2 border-green-400 bg-green-100 p-0.5  text-green-400" />
              <p>Duration: 25:00</p>
            </div>
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-7 w-7 rounded-full border-2 border-green-400 bg-green-100 p-0.5  text-green-400" />
              <p>Intervals: 1/4</p>
            </div>
            <div className="flex items-center gap-2">
              <BellAlertIcon className="h-7 w-7 rounded-full border-2 border-green-400 bg-green-100 p-0.5  text-green-400" />
              <p>Break: 5:00</p>
            </div>
          </div>
          <Timer
            isPlaying={timerIsPlaying}
            duration={intervals[currentInterval]?.duration!}
            intervalName={intervals[currentInterval]?.name!}
            onIntervalEnd={() => setCurrentInterval(currentInterval + 1)}
          />
          <CurrentTask task={currentTask} />
          <TaskCreateForm />
          <TasksList
            tasks={tasks}
            onTaskStart={(task: Task) => setCurrentTask(task)}
          />
        </div>
      </main>
    </>
  );
};

import { type SVGAttributes } from "react";

export function ClockIcon(props: SVGAttributes<SVGElement>) {
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

export function BellAlertIcon(props: SVGAttributes<SVGElement>) {
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

export function BookOpenIcon(props: SVGAttributes<SVGElement>) {
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

export function TrophyIcon(props: SVGAttributes<SVGElement>) {
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
        d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0"
      />
    </svg>
  );
}

export default Home;
