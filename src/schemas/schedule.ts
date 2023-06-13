import { DateTime, Duration, Info, Interval } from "luxon";
import { z } from "zod";

export const scheduleEventSchema = z.object({
  name: z.string(),
  startHour: z.number().max(24).min(0),
  startMin: z.number().min(0).max(59),
  hours: z.number().max(24).min(0),
  mins: z.number().min(0),
  ampm: z.enum(["AM", "PM"]),
});

// const dur = Duration.fromObject({ hours: 2, minutes: 7 });

export type Routine = {
  // Name of the routine
  name: string;

  // Starting hour and minute of the routine
  // used to calculate the start time and end time of the routine
  startHour: number;
  startMin: number;

  // Duration of the routine in minutes
  duration: number;

  // Days of the week the routine is scheduled for
  // scheduledDays: string[];

  // Tasks that needs to be performed as a part of the routine
  // tasks: Task[];
};

export const routines: Routine[] = [
  {
    name: "Breakfast",
    duration: 30,
    startHour: 7,
    startMin: 30,
  },
  {
    name: "Morning Routine",
    duration: 30,
    startHour: 7,
    startMin: 0,
  },
  {
    name: "Lunch",
    duration: 60,
    startHour: 12,
    startMin: 0,
  },
  {
    name: "Work",
    duration: 4 * 60,
    startHour: 8,
    startMin: 30,
  },
  {
    name: "Work",
    duration: 4 * 60,
    startHour: 14,
    startMin: 0,
  },
  {
    name: "Break",
    duration: 75,
    startHour: 18,
    startMin: 30,
  },
];

export const getScheduleTimes = () => {
  const sortedRoutines = routines
    .sort((a, b) => {
      return a.startHour - b.startHour || a.startMin - b.startMin;
    })
    .map((routine) => {
      const startTime = DateTime.fromObject({
        hour: routine.startHour,
        minute: routine.startMin,
      });

      return {
        startTime: startTime,
        endTime: startTime.plus({ minutes: routine.duration }),
        name: routine.name,
        rows: routine.duration / 15,
      };
    });

  const scheduleStartTime = sortedRoutines[0]!.startTime;
  const scheduleEndTime = sortedRoutines[sortedRoutines.length - 1]!.endTime;

  const scheduleDuration = Interval.fromDateTimes(
    scheduleStartTime,
    scheduleEndTime
  ).length("minutes");

  const scheduleIntervals = scheduleDuration / 15;

  return sortedRoutines.map((routine) => {
    const routineDuration = Interval.fromDateTimes(
      routine.startTime,
      routine.endTime
    ).length("minutes");

    const routineIntervals =
      Interval.fromDateTimes(scheduleStartTime, routine.startTime).length(
        "minutes"
      ) / 15;

    return {
      ...routine,
      rows: routineDuration / 15,
      rowStart: routineIntervals + 1,
      duration: formatDuration(routineDuration),
    };
  });
};

const formatDuration = (minutes: number) => {
  const hour = Math.floor(minutes / 60);
  const min = minutes % 60;

  let hourString = "";
  if (hour > 1) {
    hourString = `${hour} hours`;
  } else if (hour === 1) {
    hourString = `${hour} hour`;
  }
  const minString = min > 0 ? ` ${min} minutes` : "";

  return (hourString + minString).trim();
};

export type ScheduleEvent = z.infer<typeof scheduleEventSchema>;
