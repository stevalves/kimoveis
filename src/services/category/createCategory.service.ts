import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";
import { AppError } from "../../errors";
import { iCategory, iCategoryReturn } from "../../interfaces/category.interfaces";
import { categorySchemaReturn } from "../../schemas/category.schema";


const createCategoryService = async (categoryData: iCategory): Promise<iCategoryReturn> => {

    const catRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const userExists = await catRepository.findOneBy({
        name: categoryData.name
    })
    if(userExists) throw new AppError("Category already exists", 409)

    const category = catRepository.create(categoryData)

    await catRepository.save(category)
    
    const newCategory = categorySchemaReturn.parse(category)

    return newCategory

};

export default createCategoryService