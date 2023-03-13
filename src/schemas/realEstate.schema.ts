import { z } from "zod";
import { addressSchema } from "./address.schemas";
import { categorySchemaReturn } from "./category.schema";

const realEstateSchema = z.object({
    value: z.number().or(z.string()),
    size: z.number().int().positive(),
    categoryId: z.number().optional(),
    address: addressSchema
})

// const realEstateCreate = realEstateSchema.extend({
//     addressId: z.number()
// }).omit({address:true})

const returnRealEstateSchema = realEstateSchema.extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export { realEstateSchema, returnRealEstateSchema }