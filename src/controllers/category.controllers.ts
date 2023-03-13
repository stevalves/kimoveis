import { Request, Response } from "express";
import { AppError } from "../errors";
import { iCategory, iCategoryReturn } from "../interfaces/category.interfaces";
import createCategoryService from "../services/category/createCategory.service";
import readCategoriesService from "../services/category/readCategories.services";
import readRealEstateByCategoryService from "../services/category/readRealEstateByCategory.service";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.user.admin) throw new AppError("Insufficient permission", 403);

  const categoryData: iCategory = req.body;

  const newCategory: iCategoryReturn = await createCategoryService(
    categoryData
  );

  return res.status(201).json(newCategory);
};

const readCategoriesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const catList = await readCategoriesService();

  return res.json(catList);
};

const readRealEstateByCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);

  const list = await readRealEstateByCategoryService(id);

  return res.json(...list);
};

export {
  createCategoryController,
  readCategoriesController,
  readRealEstateByCategoryController,
};
