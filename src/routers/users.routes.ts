import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  readUsersController,
  updateUserController,
} from "../controllers/user.controllers";
import emailExistsMiddleware from "../middlewares/emailExists.middleware";
import userExistsMiddleware from "../middlewares/userExists.middleware";
import validateData from "../middlewares/validateData.middleware";
import validateTokenMiddleware from "../middlewares/validateToken.middleware";
import { userSchema, userUpdateSchema } from "../schemas/users.schemas";

const userRoutes: Router = Router();

userRoutes.post(
  "",
  validateData(userSchema),
  emailExistsMiddleware,
  createUserController
);
userRoutes.get("", validateTokenMiddleware, readUsersController);
userRoutes.patch(
  "/:id",
  validateData(userUpdateSchema),
  userExistsMiddleware,
  validateTokenMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  userExistsMiddleware,
  validateTokenMiddleware,
  deleteUserController
);

export default userRoutes;
