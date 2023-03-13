import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { AppError } from "../../errors";
import { iSchema } from "../../interfaces/schedule.interfaces";

const createScheduleService = async (shBody: iSchema, userId: number) => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const shedulesRepository: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const rEstate = await realEstateRepository.findOneBy({
    id: shBody.realEstateId,
  });

  if (!rEstate) throw new AppError("RealEstate not found", 404);

  const user = await userRepository.findOneBy({ id: userId });

  const create = {
    date: shBody.date,
    hour: shBody.hour,
    realEstate: rEstate!,
    user: user!,
  };

  const newSchedule = shedulesRepository.create(create);
  await shedulesRepository.save(newSchedule);

  return newSchedule;
};

export default createScheduleService;
