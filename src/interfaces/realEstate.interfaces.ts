import { z } from "zod";
import { realEstateSchema, returnRealEstateSchema } from "../schemas/realEstate.schema";

type iRealEstate = z.infer<typeof realEstateSchema>;
type iRealEstateReturn = z.infer<typeof returnRealEstateSchema>;
// type iRealEstateCreate = z.infer<typeof realEstateCreate>


export { iRealEstate, iRealEstateReturn };
