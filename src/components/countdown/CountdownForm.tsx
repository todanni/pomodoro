import { Button, TextInput } from "@todanni/ui";
import { type SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const countdownSchema = z.object({
  name: z.string(),
  date: z.date(),
});

export type CountdownSchema = z.infer<typeof countdownSchema>;

export const CountdownForm = () => {
  const { register, handleSubmit } = useForm<CountdownSchema>({});

  const onSubmit: SubmitHandler<CountdownSchema> = (data) => {
    console.log(data);

    const deadlines = localStorage.getItem("deadlines");
    if (!deadlines) {
      localStorage.setItem("deadlines", JSON.stringify([data]));
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const currentValue: CountdownSchema[] = JSON.parse(deadlines);
    currentValue.push(data);
    localStorage.setItem("deadlines", JSON.stringify(currentValue));
  };

  return (
    <form
      className="flex items-center gap-2"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <TextInput
        id={"countdown-name"}
        {...register("name")}
        placeholder="Event"
      />
      <input
        type="datetime-local"
        {...register("date")}
        className="rounded-lg text-gray-600"
      />
      <Button type="submit" text={"Add"} colour="green" />
    </form>
  );
  21;
};
