import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import jwt from "jsonwebtoken"
import "dotenv/config"

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction): Response | void => {

    let token = req.headers.authorization

    if(!token) throw new AppError("Missing bearer token", 401)

    token = token.split(' ')[1]
    jwt.verify(token, process.env.SECRET_KEY!, (err, dec: any) => {
        if(err) throw new AppError(err.message, 401)

        req.user = {
            id: Number(dec?.sub),
            admin: dec.admin
        }

        return next()
    })

}

export default validateTokenMiddleware