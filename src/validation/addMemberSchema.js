import { z } from "zod";
export const addMemberSchema = z.object({
  email: z.string().email().min(5),
});
