import { Button, Icon } from "@todanni/ui";
import { signIn, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { TaskCreateForm } from "./TaskCreateForm";
import { type Task } from "@prisma/client";
import { useState, type SVGAttributes } from "react";

export const Tasks = () => {
  const { data: sessionData } = useSession();
  const { data: tasks } = api.tasks.list.useQuery();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  if (!sessionData) {
    return (
      <div className="flex w-full flex-col items-center">
        <hr className="my-2 h-px w-full border-t-0 bg-gray-200" />
        <div className="flex items-center gap-8">
          <p>To create and view tasks, please log in.</p>
          <Button
            text="Log in or create free account"
            size="medium"
            colour="blue"
            onClick={() => void signIn()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col justify-between gap-1">
      <hr className="h-px w-full border-t-0 bg-gray-200" />
      {currentTask && <CurrentTask {...currentTask} />}
      <hr className="h-px w-full border-t-0 bg-gray-200" />
      <TaskCreateForm />
      <hr className="h-px w-full border-t-0 bg-gray-200" />
      <div className="my-1 flex flex-col gap-2">
        {tasks?.map((task) => {
          return task.status === "DONE" ? (
            <CompletedTask {...task} />
          ) : (
            <TodoTask {...task}></TodoTask>
          );
        })}
      </div>
      <hr className="h-px w-full border-t-0 bg-gray-200" />
      <div className="my-1 flex justify-between">
        <p className="text-end font-light text-gray-500">
          Completed tasks: 0/2
        </p>
        <p className="text-end font-light text-gray-500">
          Remaining tasks: 0/2
        </p>
        <p className="text-end font-light text-gray-500">
          Some other info: 0/2
        </p>
      </div>
    </div>
  );
};

const CurrentTask = (task: Task) => {
  return (
    <div key={task.id} className="flex h-8 items-center justify-center gap-1">
      <CurrentTaskIcon className="h-6 w-6 text-blue-500" />
      <p className="text-center text-lg text-gray-700">{task.name}</p>
    </div>
  );
};

const CompletedTask = (task: Task) => {
  const ctx = api.useContext();

  const deleteTask = api.tasks.delete.useMutation({
    onSuccess: () => {
      void ctx.tasks.list.invalidate();
    },
  });
  return (
    <div key={task.id} className="flex h-8 items-center gap-4">
      <input
        checked={task.status === "DONE"}
        type="checkbox"
        className="h-5 w-5 rounded-xl border-gray-300 text-green-400"
      />
      <p className="text-lg font-light italic text-gray-500 line-through">
        {task.name}
      </p>
      <Icon
        object="delete"
        size="xs"
        colour="red"
        className="ml-auto p-0.5 hover:cursor-pointer"
        onClick={() => deleteTask.mutate({ id: task.id })}
      />
    </div>
  );
};

const TodoTask = (task: Task) => {
  const ctx = api.useContext();

  const completeTask = api.tasks.complete.useMutation({
    onSuccess: () => {
      void ctx.tasks.list.invalidate();
    },
  });

  return (
    <div key={task.id} className="flex h-8 items-center gap-4">
      <input
        checked={task.status === "DONE"}
        type="checkbox"
        className="h-5 w-5 rounded-xl border-gray-300 text-green-400"
        onClick={() => completeTask.mutate({ id: task.id })}
      />
      <p className="text-lg text-gray-700">{task.name}</p>
      <CurrentTaskIcon className="ml-auto h-6 w-6 text-blue-500" />
    </div>
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
