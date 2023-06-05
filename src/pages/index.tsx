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
      <main className="min-h-screen bg-gray-50">
        <div className="mx-auto flex w-4/5 flex-col items-center gap-4 p-8">
          <Image
            src={logo}
            alt="ToDanni Logo"
            className="h-8 object-scale-down"
          />
          <TimerStats
            currentInterval={currentInterval}
            intervals={intervals.length}
          />
          <Timer
            interval={intervals[currentInterval]}
            onIntervalEnd={() => setCurrentInterval((prev) => prev + 1)}
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

export default Home;
