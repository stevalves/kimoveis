import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserEdit, iUserReturn } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  userData: iUserEdit,
  userId: number
): Promise<iUserReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const oldUser = await userRepository.findOneBy({
    id: userId,
  });

  const updatedUser = userRepository.create({
    ...oldUser,
    ...userData,
  });

  await userRepository.save(updatedUser);

  const user = returnUserSchema.parse(updatedUser);

  return user;
};

export default updateUserService;
