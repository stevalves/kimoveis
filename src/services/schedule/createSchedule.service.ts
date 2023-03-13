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

  const alreadySchedule = await shedulesRepository
    .createQueryBuilder("schedules")
    .select(["re", "schedules"])
    .innerJoin("schedules.realEstate", "re")
    .where("re.id = :id", { id: shBody.realEstateId })
    .andWhere("schedules.hour = :hour", { hour: shBody.hour })
    .getOne();

  const alreadyUserSchedule = await shedulesRepository
    .createQueryBuilder("schedules")
    .select(["user", "schedules"])
    .innerJoin("schedules.user", "user")
    .where("user.id = :id", { id: userId })
    .andWhere("schedules.hour = :hour", { hour: shBody.hour })
    .getOne();

  if (alreadyUserSchedule !== null) {
    throw new AppError(
      "User schedule to this real estate at this date and time already exists",
      409
    );
  }

  if (alreadySchedule !== null) {
    throw new AppError(
      "Schedule to this real estate at this date and time already exists",
      409
    );
  }

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
