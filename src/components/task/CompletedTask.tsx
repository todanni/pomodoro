import { type Task } from "@prisma/client";
import { Icon } from "@todanni/ui";
import { api } from "~/utils/api";

export const CompletedTask = (task: Task) => {
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
      <p className="font-light italic text-gray-500 line-through">
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
