import { z } from "zod";
export const signUpFormSchema = z
  .object({
    email: z.string().email().min(5),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    leetcodeId: z.string().min(2),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
