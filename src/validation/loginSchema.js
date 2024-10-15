import { z } from "zod";
export const loginSchema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(8),
});
