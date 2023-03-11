import { Router } from 'express'
import { createUserController, deleteUserController, readUsersController, updateUserController } from '../controllers/user.controllers'
import emailExistsMiddleware from '../middlewares/emailExists.middleware'
import userExistsMiddleware from '../middlewares/userExists.middleware'
import validateData from '../middlewares/validateData.middleware'
import { userSchema, userUpdateSchema } from '../schemas/users.schemas'

const userRoutes: Router = Router()

userRoutes.post('', validateData(userSchema), emailExistsMiddleware, createUserController)
userRoutes.get('', readUsersController)
userRoutes.patch('/:id', validateData(userUpdateSchema), userExistsMiddleware, updateUserController)
userRoutes.delete('/:id', userExistsMiddleware, deleteUserController)

export default userRoutes