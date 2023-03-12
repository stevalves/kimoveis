import { hashSync } from "bcryptjs";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().max(45).min(3),
  email: z.string().email().max(45).min(10),
  admin: z.boolean().default(false),
  password: z
    .string()
    .max(120)
    .min(4)
    .transform((p) => {
      return hashSync(p, 10);
    }),
});

const returnUserSchema = userSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
    deletedAt: z.string().nullable(),
  })
  .omit({ password: true });

const returnUsersSchema = returnUserSchema.array();
const userUpdateSchema = z.object({
  name: z.string().max(45).min(3).optional(),
  email: z.string().email().max(45).min(10).optional(),
  password: z
    .string()
    .max(120)
    .min(4)
    .optional(),
});

export { userSchema, returnUserSchema, returnUsersSchema, userUpdateSchema };
