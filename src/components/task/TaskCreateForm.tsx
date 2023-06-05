import { type SVGAttributes } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type TaskSchema } from "~/schemas/task";
import { api } from "~/utils/api";

export const TaskCreateForm = () => {
  const ctx = api.useContext();

  const task = api.tasks.add.useMutation({
    onSuccess: () => {
      void ctx.tasks.list.invalidate();
      reset();
    },
  });

  const { register, handleSubmit, reset } = useForm<TaskSchema>({});

  const onSubmit: SubmitHandler<TaskSchema> = (data: TaskSchema) => {
    task.mutate(data);
  };

  return (
    <form
      className="flex w-full items-center gap-2 rounded-xl bg-white px-4 py-2 shadow-xl md:order-3"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <CreateIcon className="h-6 w-6 text-green-300" />
      <input
        type="text"
        className="placeholder:text-md w-full border-none p-1 text-gray-700 placeholder:font-light focus:outline-none focus:ring-0"
        autoComplete="off"
        placeholder="Create a new task..."
        {...register("name", { required: true })}
      />
    </form>
  );
};

function CreateIcon(props: SVGAttributes<SVGElement>) {
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
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  );
}
