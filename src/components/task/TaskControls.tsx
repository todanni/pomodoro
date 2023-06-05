import { Button } from "@todanni/ui";

export const TaskControls = () => {
  return (
    <div className="mt-auto flex w-full items-center justify-center gap-2">
      <Button text={"Complete all"} colour="green" />
      <Button text={"Delete all"} colour="red" />
    </div>
  );
};
