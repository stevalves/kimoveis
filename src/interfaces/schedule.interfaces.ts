import { z } from "zod";
import { shedulesSchema } from "../schemas/schedules.schemas";

type iSchema = z.infer<typeof shedulesSchema>;

export { iSchema };
