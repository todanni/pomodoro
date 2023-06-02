import { z } from "zod";

export const taskSchema = z.object({
  id: z.string().optional(),
  userId: z.string().default(""),
  name: z.string(),
  description: z.string().default(""),
  priority: z.boolean().optional(),
  projectId: z.string().default(""),
});

export type TaskSchema = z.infer<typeof taskSchema>;
