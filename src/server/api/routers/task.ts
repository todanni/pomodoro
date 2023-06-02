import { Status } from "@prisma/client";
import { z } from "zod";
import { taskSchema } from "~/schemas/task";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  add: protectedProcedure.input(taskSchema).mutation(({ ctx, input }) => {
    // Overwrite the userId with the current user's id
    input.userId = ctx.session?.user.id;

    return ctx.prisma.task.create({
      data: {
        ...input,
      },
    });
  }),

  list: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: {
        userId: ctx.session?.user.id,
        // status: Status.TODO,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  complete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          status: Status.DONE,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
