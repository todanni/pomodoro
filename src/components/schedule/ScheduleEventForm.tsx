import { Button } from "@todanni/ui";
import { DateTime } from "luxon";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type ScheduleEvent } from "~/schemas/schedule";
import { hourOptions, minutesOptions } from "~/utils/schedule";

export const ScheduleEventForm = () => {
  const { register, handleSubmit } = useForm<ScheduleEvent>({
    defaultValues: {
      startHour: 8,
      startMin: 0,
    },
  });

  const onSubmit: SubmitHandler<ScheduleEvent> = (data) => {
    console.log(data);

    const startTime = DateTime.fromObject({
      hour: data.startHour,
      minute: data.startMin,
    }); //~> today at 07:30:00

    console.log(startTime.toLocaleString(DateTime.TIME_24_SIMPLE));
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
    >
      <input
        id="name"
        {...register("name")}
        placeholder="Wake up time!"
        className="rounded-lg border border-gray-300 p-2 text-center"
        required
      />

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
          {...register("hours")}
          type="number"
          className="appearance-none rounded-lg border border-gray-300 p-2 text-center"
        />
        <input
          id="mins"
          placeholder="30 Mins"
          {...register("mins")}
          type="number"
          className="appearance-none rounded-lg border border-gray-300 p-2 text-center"
        />
      </div>
      <Button type="submit" text="Schedule" colour="blue" className="" />
    </form>
  );
};
