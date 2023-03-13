import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate } from "../../entities";

const realRealEstatesService = async (): Promise<RealEstate[]> => {
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const list = await realEstateRepository.find({
    relations: {
      address: true,
    },
  });

  return list;
};

export default realRealEstatesService;
