import { z } from "zod";

const createLoginSchema = z.object({
  email: z.string().email().max(45).min(10),
  password: z.string().max(120).min(4),
});

export { createLoginSchema };
