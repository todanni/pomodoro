import { Button } from "@todanni/ui";
import { Duration } from "luxon";
import { type SubmitHandler, useForm } from "react-hook-form";
import { hourOptions, minutesOptions } from "~/utils/schedule";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type CreateRoutineSchema,
  type RoutineSchema,
  createRoutineSchema,
} from "~/schemas/routine";
import { api } from "~/utils/api";

type ScheduleRoutineFormProps = {
  refresh?: () => void;
};

export const ScheduleRoutineForm = ({}: ScheduleRoutineFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRoutineSchema>({
    resolver: zodResolver(createRoutineSchema),
    defaultValues: {
      startHour: 8,
      startMin: 0,
    },
  });

  const ctx = api.useContext();
  const routine = api.routines.add.useMutation({
    onSuccess: () => {
      void ctx.routines.list.invalidate();
      reset();
    },
  });

  const onSubmit: SubmitHandler<CreateRoutineSchema> = (data) => {
    console.log("submitting");

    const duration = Duration.fromObject({
      minutes: data.hours,
      hours: data.hours,
    }).as("minutes");

    const newRoutine: RoutineSchema = {
      name: data.name,
      startHour: data.ampm === "AM" ? data.startHour : data.startHour + 12,
      startMin: data.startMin,
      duration: duration,
      days: "",
      userId: "",
    };
    routine.mutate(newRoutine);
  };

  return (
    <form
      className="flex flex-col gap-2"
      autoComplete="off"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <h1 className="text-lg font-semibold text-gray-700">
        Add routine to schedule
      </h1>
      <input
        id="name"
        {...register("name")}
        placeholder="Wake up time!"
        className="rounded-lg border border-gray-300 p-2 text-center"
        required
      />
      {errors.name?.message && <p>{errors.name?.message}</p>}
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-2 inline-flex justify-center rounded-md border border-gray-300 p-2 text-gray-600">
          <select
            id="hour-select"
            className="appearance-none bg-transparent px-2 outline-none"
            {...register("startHour", { valueAsNumber: true })}
          >
            {hourOptions().map((hour) => (
              <option key={hour.value} value={hour.value}>
                {hour.label}
              </option>
            ))}
          </select>
          <span className="px-2">:</span>
          <select
            id="mininute-select"
            {...register("startMin", { valueAsNumber: true })}
            className="appearance-none bg-transparent px-2 outline-none"
          >
            {minutesOptions.map((mininute) => (
              <option key={mininute.value} value={mininute.value}>
                {mininute.label}
              </option>
            ))}
          </select>
          <select
            id="ampm-select"
            {...register("ampm")}
            className="appearance-none bg-transparent px-2 outline-none"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>
        <input
          id="hours"
          placeholder="1 Hour"
          {...register("hours", { valueAsNumber: true })}
          type="number"
          className="appearance-none rounded-lg border border-gray-300 p-2 text-center"
        />
        <input
          id="mins"
          placeholder="30 Mins"
          {...register("mins", { valueAsNumber: true })}
          type="number"
          className="appearance-none rounded-lg border border-gray-300 p-2 text-center"
        />
      </div>
      <Button type="submit" text="Schedule" colour="blue" />
      {errors.hours?.message && <p>{errors.hours?.message}</p>}
      {errors.mins?.message && <p>{errors.mins?.message}</p>}
      {errors.startHour?.message && <p>{errors.startHour?.message}</p>}
      {errors.startMin?.message && <p>{errors.startMin?.message}</p>}
      {errors.ampm?.message && <p>{errors.ampm?.message}</p>}
    </form>
  );
};
