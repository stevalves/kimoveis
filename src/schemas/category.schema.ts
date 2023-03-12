import { z } from "zod";

const categorySchema = z.object({
  name: z.string().max(45).min(3),
});

const categorySchemaReturn = categorySchema.extend({
  id: z.number(),
});

const categoriesSchemaReturn = categorySchemaReturn.array()

export { categorySchema, categorySchemaReturn, categoriesSchemaReturn };
