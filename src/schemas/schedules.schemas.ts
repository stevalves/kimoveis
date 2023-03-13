import { z } from "zod";

const shedulesSchema = z.object({
  date: z.string(),
  hour: z.string(),
  realEstateId: z.number(),
});

export { shedulesSchema };
