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
    createAt: z.date().default(new Date),
    updatedAt: z.date(),
    deletedAt: z.date().nullable().default(null),
  })
  .omit({ password: true });

const returnUsersSchema = returnUserSchema.array() 
const userUpdateSchema = userSchema.partial()

export { userSchema, returnUserSchema, returnUsersSchema, userUpdateSchema };