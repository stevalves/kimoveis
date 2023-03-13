import { Request, Response } from "express";
import { AppError } from "../errors";
import {
  iUser,
  iUserReturn,
  iUsersReturn,
} from "../interfaces/users.interfaces";
import createUserService from "../services/user/createUser.service";
import deleteUserService from "../services/user/deleteUser.service";
import updateUserService from "../services/user/patchUser.service";
import readUsersService from "../services/user/readUsers.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: iUser = req.body;

  const newUser: iUserReturn = await createUserService(userData);

  return res.status(201).json(newUser);
};

const readUsersController = async (req: Request, res: Response) => {
  if (!req.user.admin) throw new AppError("Insufficient permission", 403);

  const users: iUsersReturn = await readUsersService();

  return res.json(users);
};

const deleteUserController = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (!req.user.admin && req.user.id !== userId)
    throw new AppError("Insufficient permission", 403);

  await deleteUserService(Number(req.params.id));

  return res.status(204).send();
};

const updateUserController = async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const userData = req.body;
  if (!req.user.admin && req.user.id !== userId)
    throw new AppError("Insufficient permission", 403);

  const updatedUser = await updateUserService(userData, userId);

  return res.json(updatedUser);
};

export {
  createUserController,
  readUsersController,
  deleteUserController,
  updateUserController,
};
