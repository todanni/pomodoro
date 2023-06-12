import { api } from "~/utils/api";
import { CompleteIconButton, DeleteIconButton } from "./TasksList";

export const TaskControls = () => {
  const ctx = api.useContext();

  const completeAllTasks = api.tasks.completeAll.useMutation({
    onSuccess: () => {
      void ctx.tasks.list.invalidate();
    },
  });

  const deleteAllTasks = api.tasks.deleteAll.useMutation({
    onSuccess: () => {
      void ctx.tasks.list.invalidate();
    },
  });
  return (
    <div className="flex justify-center py-2">
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => completeAllTasks.mutate()}
          className="inline-flex  items-center justify-center gap-2 whitespace-nowrap rounded-2xl  bg-white px-4 py-1 text-center font-medium text-gray-700 shadow-lg"
        >
          <CompleteIconButton className="h-6 w-6 text-green-400" />
          Complete all tasks
        </button>
        <button
          onClick={() => deleteAllTasks.mutate()}
          className="inline-flex  items-center justify-center gap-2 whitespace-nowrap rounded-2xl  bg-white px-4 py-1 text-center font-medium text-gray-700 shadow-lg"
        >
          <DeleteIconButton className="h-6 w-6 text-red-600" />
          Delete all tasks
        </button>
      </div>
    </div>
  );
};
