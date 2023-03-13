import { Router } from "express";
import {
  createRealEstate,
  realRealEstates,
} from "../controllers/realEstate.controllers";
import validateData from "../middlewares/validateData.middleware";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import { realEstateSchema } from "../schemas/realEstate.schema";

const realEstateRoutes: Router = Router();

realEstateRoutes.post(
  "",
  validateData(realEstateSchema),
  validateTokenMiddleware,
  createRealEstate
);
realEstateRoutes.get("", realRealEstates);

export default realEstateRoutes;
