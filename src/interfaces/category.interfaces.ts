import { z } from "zod";
import {
  categoriesSchemaReturn,
  categorySchema,
  categorySchemaReturn,
} from "../schemas/category.schema";

type iCategory = z.infer<typeof categorySchema>;
type iCategoryReturn = z.infer<typeof categorySchemaReturn>;
type iCategoriesReturn = z.infer<typeof categoriesSchemaReturn>;

export { iCategory, iCategoryReturn, iCategoriesReturn };
