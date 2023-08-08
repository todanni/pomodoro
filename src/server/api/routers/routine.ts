import { DateTime } from "luxon";
import { type ScheduledRoutine, routineSchema } from "~/schemas/routine";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const routinessRouter = createTRPCRouter({
  add: protectedProcedure.input(routineSchema).mutation(({ ctx, input }) => {
    input.userId = ctx.session?.user.id;

    return ctx.prisma.routine.create({
      data: {
        ...input,
      },
    });
  }),

  list: protectedProcedure.query(async ({ ctx }) => {
    const routines = await ctx.prisma.routine.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
      orderBy: [{ startHour: "asc" }, { startMin: "asc" }],
    });

    const schedule: ScheduledRoutine[] = routines.map((routine) => {
      const startTime = DateTime.fromObject({
        hour: routine.startHour,
        minute: routine.startMin,
      });
      return {
        name: routine.name,
        duration: formatDuration(routine.duration),
        startTime: startTime,
        endTime: startTime.plus({ minutes: routine.duration }),
        intervals: routine.duration / 15,
      };
    });

    console.log(schedule);

    return schedule;
  }),
});

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
