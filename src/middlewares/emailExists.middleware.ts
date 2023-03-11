import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { AppError } from "../errors";

const emailExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findEmailUser = await userRepository.findOneBy({
    email: req.body.email,
  });

  if (findEmailUser) {
    throw new AppError("Email already exists.", 409);
  }

  return next();
};

export default emailExistsMiddleware;
