import { Button } from "@todanni/ui";
import { signIn, useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { CurrentTaskIcon } from "./CurrentTask";
import { CompletedTask } from "./CompletedTask";
import { type Task } from "@prisma/client";
import { type SVGAttributes } from "react";

type TaskListProps = {
  tasks: Task[] | undefined;
  onTaskStart: (task: Task) => void;
};

export const TasksList = ({ tasks, onTaskStart }: TaskListProps) => {
  const { data: sessionData } = useSession();

  if (!sessionData) {
    return (
      <div className="flex w-full flex-col items-center">
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
    <div className="flex w-full flex-col gap-1">
      <div className="my-1 flex flex-col gap-2 rounded-xl border-t border-t-gray-200 bg-white p-4 shadow-xl ">
        {tasks?.map((task) => {
          return task.status === "DONE" ? (
            <CompletedTask {...task} />
          ) : (
            <TodoTask task={task} onTaskStart={() => onTaskStart(task)} />
          );
        })}
      </div>
    </div>
  );
};

type TodoTaskProps = {
  task: Task;
  onTaskStart: (task: Task) => void;
};

const TodoTask = ({ task, onTaskStart }: TodoTaskProps) => {
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
        onChange={() => completeTask.mutate({ id: task.id })}
      />
      <p className="text-gray-700">{task.name}</p>
      <CurrentTaskIcon
        className="ml-auto h-6 w-6 text-blue-500 hover:cursor-pointer"
        onClick={() => onTaskStart(task)}
      />
    </div>
  );
};

export function CompleteIconButton(props: SVGAttributes<SVGElement>) {
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
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

export function DeleteIconButton(props: SVGAttributes<SVGElement>) {
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
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
      />
    </svg>
  );
}
