import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { iCategoriesReturn } from "../../interfaces/category.interfaces";

const readCategoriesService = async (): Promise<iCategoriesReturn> => {
  const catRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

  const catList: Category[] = await catRepository.find();

  return catList;
};

export default readCategoriesService;
