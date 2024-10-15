import { z } from "zod";
export const leetcodeUsernameSchema = z.object({
  leetcodeUsername: z.string().min(2),
});

export const signUpFormSchema = z
  .object({
    email: z.string().email().min(5),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
