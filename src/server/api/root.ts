import { createTRPCRouter } from "~/server/api/trpc";
import { tasksRouter } from "./routers/task";
import { routinessRouter } from "./routers/routine";

export const appRouter = createTRPCRouter({
  tasks: tasksRouter,
  routines: routinessRouter,
});

export type AppRouter = typeof appRouter;
