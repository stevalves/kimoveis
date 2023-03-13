import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";

const readRealEstateByCategoryService = async (categoryId: number) => {
  const categoryRespository: Repository<Category> =
    AppDataSource.getRepository(Category);
  const realEstateRepository: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);

  const category = await categoryRespository.findOneBy({
    id: categoryId,
  });
  if (!category) throw new AppError("Category not found", 404);

  const realEstateList = await categoryRespository.find({
    relations: { realEstate: true},
    where: {
        id: categoryId
    }
  });

  return realEstateList;
};

export default readRealEstateByCategoryService;
