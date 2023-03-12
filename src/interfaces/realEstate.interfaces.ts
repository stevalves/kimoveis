import { z } from "zod";
import { realEstateSchema, returnRealEstateSchema } from "../schemas/realEstate.schema";

type iRealEstate = z.infer<typeof realEstateSchema>;
type iRealEstateReturn = z.infer<typeof returnRealEstateSchema>;


export { iRealEstate, iRealEstateReturn, };
