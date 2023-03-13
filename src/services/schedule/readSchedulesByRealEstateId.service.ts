import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";
import { AppError } from "../../errors";

const readSchedulesByRealEstateIdService = (realEstateId: number) => {
  const reRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

    const re = reRepo.findOneBy({id: realEstateId})
    if(!re) throw new AppError("RealEstate not found", 404)

  const shedulesByRealEstates = reRepo
    .createQueryBuilder("re")
    .select(["re", "cat", "sch", "user", "address"])
    .innerJoin("re.schedules", "sch")
    .innerJoin("re.address", "address")
    .leftJoin("re.category", "cat")
    .leftJoin("sch.user", "user")
    .where("re.id = :id", { id: realEstateId })
    .getOne();

  return shedulesByRealEstates;
};

export default readSchedulesByRealEstateIdService;
