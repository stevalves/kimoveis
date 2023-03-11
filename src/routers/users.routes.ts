import { Router } from 'express'
import { createUserController, deleteUserController, readUsersController, updateUserController } from '../controllers/user.controllers'
import emailExistsMiddleware from '../middlewares/emailExists.middleware'
import userExistsMiddleware from '../middlewares/userExists.middleware'
import validateData from '../middlewares/validateData.middleware'
import validateToken from '../middlewares/validateToken.middleware'
import { userSchema, userUpdateSchema } from '../schemas/users.schemas'

const userRoutes: Router = Router()

userRoutes.post('', validateData(userSchema), emailExistsMiddleware, createUserController)
userRoutes.get('', validateToken, readUsersController)
userRoutes.patch('/:id', validateData(userUpdateSchema), userExistsMiddleware, validateToken, updateUserController)
userRoutes.delete('/:id', userExistsMiddleware, validateToken, deleteUserController)

export default userRoutes