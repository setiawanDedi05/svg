import { z } from "zod";

export const createAiShortSchema = z.object({
  topic: z
    .string()
    .min(3, {
      message: "topic must be more than 3 character",
    })
    .max(150, { message: "topic must be less than 150 character" }),
  style: z.string(),
  duration: z.string(),
});
