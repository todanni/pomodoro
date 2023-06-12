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
import { TimerStats } from "~/components/timer/TimerStats";
import { type Interval } from "~/schemas/timer";
import { TaskControls } from "~/components/task/TaskControls";

const intervals: Interval[] = [
  { duration: 25, name: "Work" },
  { duration: 5, name: "Break" },
  { duration: 25, name: "Work" },
  { duration: 5, name: "Break" },
  { duration: 25, name: "Work" },
  { duration: 5, name: "Break" },
  { duration: 25, name: "Work" },
  { duration: 5, name: "Break" },
];

const Home: NextPage = () => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [intervalIndex, setIntervalIndex] = useState(0);
  const { data: tasks } = api.tasks.list.useQuery();

  return (
    <div className="flex h-screen flex-col gap-4">
      <Head>
        <title>Pomodoro | ToDanni</title>
        <meta name="description" content="ToDanni Pomodoro timer with tasks." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* xl is 1280px, lg is 1024px */}
      <header className="flex w-full items-center justify-center pt-4">
        <Image
          src={logo}
          alt="ToDanni Logo"
          className="h-8 object-scale-down"
        />
      </header>
      <main className="flex flex-1 justify-center lg:flex-none">
        <div className="grid w-11/12 content-start gap-4 lg:m-auto lg:max-w-6xl lg:grid-cols-2">
          <div className="lg:order-5">
            <TimerStats
              currentInterval={intervalIndex}
              intervals={intervals.length}
            />
          </div>
          <div className="lg:order-3">
            <Timer
              interval={
                intervals[intervalIndex] || {
                  duration: 25,
                  name: "Finished!",
                }
              }
              repeat={intervalIndex < intervals.length - 1}
              intervalIndex={intervalIndex}
              onComplete={() => setIntervalIndex((index) => index + 1)}
            />
          </div>
          <div className="lg:order-1">
            <CurrentTask task={currentTask} />
          </div>
          <div className="lg:order-2">
            <TaskCreateForm />
          </div>
          <div className="lg:order-4 lg:h-full">
            <TasksList
              tasks={tasks}
              onTaskStart={(task: Task) => setCurrentTask(task)}
              currentTask={currentTask}
            />
          </div>
          <div className="lg:order-6 lg:self-center">
            <TaskControls />
          </div>
        </div>
      </main>
      <footer className="w-full pb-2">
        <p className="text-center font-thin tracking-wider text-gray-600">
          Copyright Ⓒ 2023 ToDanni. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
