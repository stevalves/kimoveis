import { Request, Response } from "express";
import { iUser, iUserReturn, iUsersReturn } from "../interfaces/users.interfaces";
import createUserService from "../services/user/createUser.services";
import deleteUserService from "../services/user/deleteUser.service";
import updateUserService from "../services/user/patchUser.service";
import readUsersService from "../services/user/readUsers.service";

const createUserController = async (req: Request, res: Response) => {

    const userData: iUser = req.body

    const newUser: iUserReturn = await createUserService(userData)

    return res.status(201).json(newUser)

}

const readUsersController = async (req: Request, res: Response) => {

    const users: iUsersReturn = await readUsersService()

    return res.json(users)

}

const deleteUserController = async (req: Request, res: Response) => {

    await deleteUserService(Number(req.params.id))

    return res.status(204).send()

}

const updateUserController = async (req: Request, res: Response) => {

    const userData = req.body
    const userId = Number(req.params.id)

    const updatedUser = await updateUserService(userData, userId)

    return res.json(updatedUser)

}

export { createUserController, readUsersController, deleteUserController, updateUserController }