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
  currentTask: Task | null;
};

export const TasksList = ({
  tasks,
  currentTask,
  onTaskStart,
}: TaskListProps) => {
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
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full flex-col gap-2 rounded-xl border-t border-t-gray-200 bg-white p-4 shadow-xl ">
        {tasks?.length === 0 && (
          <p className="text-center font-light italic text-gray-500">
            Your task queue will appear here once you create tasks...
          </p>
        )}
        {tasks?.map((task) => {
          return task.status === "DONE" ? (
            <CompletedTask {...task} />
          ) : (
            <TodoTask
              task={task}
              onTaskStart={() => onTaskStart(task)}
              isCurrentTask={task.id === currentTask?.id}
            />
          );
        })}
      </div>
    </div>
  );
};

type TodoTaskProps = {
  task: Task;
  isCurrentTask?: boolean;
  onTaskStart: (task: Task) => void;
};

const TodoTask = ({ task, isCurrentTask, onTaskStart }: TodoTaskProps) => {
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
        className="form-checkbox h-5 w-5 rounded-xl border-gray-300 text-green-400"
        onChange={() => completeTask.mutate({ id: task.id })}
      />
      <p className="text-gray-700">{task.name}</p>
      {isCurrentTask ? (
        <Spinner />
      ) : (
        <CurrentTaskIcon
          className="ml-auto h-6 w-6 text-green-400 hover:cursor-pointer"
          onClick={() => onTaskStart(task)}
        />
      )}
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

const Spinner = () => {
  return (
    <div role="status" className="ml-auto flex items-center justify-center">
      <svg
        aria-hidden="true"
        className="mr-0.5 inline h-5 w-5 animate-spin fill-green-400 text-gray-200"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
};
