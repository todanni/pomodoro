import { Status } from "@prisma/client";
import { z } from "zod";
import { taskSchema } from "~/schemas/task";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tasksRouter = createTRPCRouter({
  add: protectedProcedure.input(taskSchema).mutation(({ ctx, input }) => {
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
      },
      orderBy: [
        {
          status: "asc",
        },
        {
          createdAt: "desc",
        },
      ],
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

  completeAll: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.task.updateMany({
      where: {
        userId: ctx.session?.user.id,
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

  deleteAll: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.task.deleteMany({
      where: {
        userId: ctx.session?.user.id,
      },
    });
  }),
});
