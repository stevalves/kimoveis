import { Router } from 'express'
import { createCategoryController, readCategoriesController } from '../controllers/category.controllers'
import validateData from '../middlewares/validateData.middleware'
import validateTokenMiddleware from '../middlewares/validateToken.middleware'
import { categorySchema } from '../schemas/category.schema'

const categoriesRoutes: Router = Router()

categoriesRoutes.post('', validateData(categorySchema), validateTokenMiddleware, createCategoryController)
categoriesRoutes.get('', readCategoriesController)
categoriesRoutes.get('/:id/realEstate', )

export default categoriesRoutes