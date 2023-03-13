import { Router } from 'express'
import { createSheduleController, readSchedulesByRealEstateIdController } from '../controllers/schedules.controllers'
import validateData from '../middlewares/validateData.middleware'
import validateTokenMiddleware from '../middlewares/validateToken.middleware'
import { shedulesSchema } from '../schemas/schedules.schemas'

const schedulesRoutes: Router = Router()

schedulesRoutes.post('', validateTokenMiddleware ,validateData(shedulesSchema), createSheduleController)
schedulesRoutes.get('/realEstate/:id', validateTokenMiddleware, readSchedulesByRealEstateIdController)

export default schedulesRoutes