import { Request, Response } from "express";
import { AppError } from "../errors";
import createRealEstateService from "../services/realEstate/createRealEstate.service";
import realRealEstatesService from "../services/realEstate/readRealEstates.service";

const createRealEstate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user.admin) throw new AppError("Insufficient permission", 403);

  const newRealEstate = await createRealEstateService(req.body);

  return res.status(201).json(newRealEstate);
};

const realRealEstates = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const list = await realRealEstatesService();

  return res.json(list);
};

export { createRealEstate, realRealEstates };
