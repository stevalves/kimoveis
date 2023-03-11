import { DeepPartial } from "typeorm";
import { z } from "zod";
import { returnUserSchema, returnUsersSchema, userSchema, userUpdateSchema } from "../schemas/users.schemas";

type iUser = z.infer<typeof userSchema>;
type iUserReturn = z.infer<typeof returnUserSchema>;
type iUsersReturn = z.infer<typeof returnUsersSchema>
type iUserUpdate = z.infer<typeof userUpdateSchema>
type iUserEdit = DeepPartial<iUser>

export { iUser, iUserReturn, iUsersReturn, iUserUpdate, iUserEdit };
