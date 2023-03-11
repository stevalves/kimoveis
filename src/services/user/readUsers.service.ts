import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUsersReturn } from "../../interfaces/users.interfaces";
import { returnUsersSchema } from "../../schemas/users.schemas";

const readUsersService = async (): Promise<iUsersReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const users = await userRepository.find({withDeleted:true});

  const response = returnUsersSchema.parse(users);

  return response;
};

export default readUsersService;
