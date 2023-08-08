import { type DateTime } from "luxon";
import { z } from "zod";

export const routineSchema = z.object({
  name: z.string(),
  startHour: z.number(),
  startMin: z.number(),
  duration: z.number(),
  days: z.string().default(""),
  userId: z.string().default(""),
});

export type RoutineSchema = z.infer<typeof routineSchema>;

export const createRoutineSchema = z.object({
  name: z.string(),
  startHour: z.number(),
  startMin: z.number(),
  ampm: z.enum(["AM", "PM"]).default("AM"),
  hours: z.number().max(24).min(0).int(),
  mins: z.number().min(0).max(59).int(),
});

export type CreateRoutineSchema = z.infer<typeof createRoutineSchema>;

export type ScheduledRoutine = {
  name: string;
  startTime: DateTime;
  endTime: DateTime;
  duration: string;
  intervals: number;
  isCurrent?: boolean;
};
