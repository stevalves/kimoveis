import { z } from "zod";
import { addressSchema } from "./address.schemas";

const realEstateSchema = z.object({
  value: z.number().or(z.string()),
  size: z.number().int().positive(),
  categoryId: z.number().optional(),
  address: addressSchema,
});

const returnRealEstateSchema = realEstateSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export { realEstateSchema, returnRealEstateSchema };
