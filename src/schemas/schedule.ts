import { DateTime, Interval } from "luxon";
import { z } from "zod";

export const scheduleEventSchema = z.object({
  name: z.string(),
  startHour: z.number().max(24).min(0),
  startMin: z.number().min(0).max(59),
  hours: z.number().max(24).min(0),
  mins: z.number().min(0),
  ampm: z.enum(["AM", "PM"]),
});

export type Routine = {
  name: string;
  startHour: number;
  startMin: number;
  duration: number;
};

export type ScheduledRoutine = {
  rows: number;
  rowStart: number;
  duration: string;
  startTime: DateTime;
  endTime: DateTime;
  name: string;
  isCurrent?: boolean;
};
export type ScheduleEvent = z.infer<typeof scheduleEventSchema>;

export const scheduleRoutineSchema = z.object({
  name: z.string(),
  startHour: z.number().max(12).min(1),
  startMin: z.number().min(0).max(59),
  ampm: z.enum(["AM", "PM"]).default("AM"),
  hours: z.number().max(24).min(0).int(),
  mins: z.number().min(0).max(59).int(),
});
export type ScheduleRoutineSchema = z.infer<typeof scheduleRoutineSchema>;

export const getScheduleTimes = (currentTime: DateTime) => {
  const storedRoutines = localStorage.getItem("routines");
  if (!storedRoutines) {
    return [];
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const currentValue: Routine[] = JSON.parse(storedRoutines);
  if (!currentValue || currentValue.length < 1) {
    return [];
  }

  const sortedRoutines = currentValue
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

  if (sortedRoutines.length === 0 || sortedRoutines[0] === undefined) {
    return [];
  }

  const scheduleStartTime = sortedRoutines[0].startTime;

  const result: ScheduledRoutine[] = sortedRoutines.map((routine) => {
    const routineDuration = Interval.fromDateTimes(
      routine.startTime,
      routine.endTime
    ).length("minutes");

    const routineIntervals =
      Interval.fromDateTimes(scheduleStartTime, routine.startTime).length(
        "minutes"
      ) / 15;

    // If we want only the current routine to be expanded, we can use this
    // currentTime > routine.endTime || currentTime < routine.startTime

    return {
      ...routine,
      isCurrent:
        currentTime < routine.endTime && currentTime > routine.startTime,
      rows: currentTime > routine.endTime ? 1 : routineDuration / 15,
      rowStart: routineIntervals + 1,
      duration: formatDuration(routineDuration),
    };
  });

  return result;
};

export const formatDuration = (minutes: number) => {
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

export const formatRemainingTime = (end: DateTime) => {
  const durationMins = Interval.fromDateTimes(
    // DateTime.fromObject({ hour: 16, minute: 15 }),
    DateTime.now(),
    end
  ).length("minutes");
  return formatDuration(durationMins);
};

export const calculateProgress = (start: DateTime, end: DateTime) => {
  const totalDurationMins = Interval.fromDateTimes(start, end).length(
    "seconds"
  );

  const remainingDurationMins = Interval.fromDateTimes(
    // DateTime.fromObject({ hour: 16, minute: 15 }),
    DateTime.now(),
    end
  ).length("seconds");

  return Math.floor((remainingDurationMins / totalDurationMins) * 100);
};
