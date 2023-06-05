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
  const [currentInterval, setCurrentInterval] = useState(0);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const { data: tasks } = api.tasks.list.useQuery();

  return (
    <>
      <Head>
        <title>Pomodoro | ToDanni</title>
        <meta name="description" content="ToDanni Pomodoro timer with tasks." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* xl is 1280px, lg is 1024px */}
      <main className="h-screen w-full bg-gray-50 p-4">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-2">
          <Image
            src={logo}
            alt="ToDanni Logo"
            className="h-8 object-scale-down lg:order-1 lg:col-span-2"
          />
          <div className="lg:order-6">
            <TimerStats
              currentInterval={currentInterval}
              intervals={intervals.length}
            />
          </div>
          <div className="lg:order-4">
            <Timer
              interval={intervals[currentInterval]}
              onIntervalEnd={() => setCurrentInterval((prev) => prev + 1)}
            />
          </div>
          <div className="lg:order-2">
            <CurrentTask task={currentTask} />
          </div>
          <div className="lg:order-3">
            <TaskCreateForm />
          </div>
          <div className="lg:order-5 lg:h-full">
            <TasksList
              tasks={tasks}
              onTaskStart={(task: Task) => setCurrentTask(task)}
            />
          </div>
          <div className="lg:order-7 lg:self-center">
            <TaskControls />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
