import { z } from "zod";

export const createCustomChallengeSchema = z.object({
  name: z.string().min(5, "Challenge name must be at least 5 characters long"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters long"),
  isPublic: z.boolean().optional(), // Optional as it might default to false
  challenges: z
    .array(
      z.object({
        link: z
          .string()
          .url("Invalid link format")
          .min(5, "Link must be at least 5 characters long"),
        difficulty: z.enum(["easy", "medium", "hard"], {
          errorMap: () => ({ message: "Invalid difficulty selected" }),
        }),
      })
    )
    .min(1, "At least one challenge is required")
    .max(20, "You can add up to 20 challenges only"),
});
