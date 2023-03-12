import { Request, Response } from "express";
import { AppError } from "../errors";
import { iCategory, iCategoryReturn } from "../interfaces/category.interfaces";
import createCategoryService from "../services/category/createCategory.service";
import readCategoriesService from "../services/category/readCategories.services";

const createCategoryController = async (req: Request, res: Response): Promise<Response> => {
    if(!req.user.admin) throw new AppError("Insufficient permission", 403);

    const categoryData: iCategory = req.body;

    const newCategory: iCategoryReturn = await createCategoryService(categoryData);

    return res.status(201).json(newCategory);

}

const readCategoriesController = async (req: Request, res: Response): Promise<Response> => {

    const catList = await readCategoriesService()

    return res.json(catList)

}

export { createCategoryController, readCategoriesController }