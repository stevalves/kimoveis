import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, Category, RealEstate } from "../../entities";
import { AppError } from "../../errors";
import { iRealEstate } from "../../interfaces/realEstate.interfaces";
import { addressSchemaReturn } from "../../schemas/address.schemas";

const createRealEstateService = async (realEstateData: iRealEstate): Promise<any> => {

    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)
    const categoryRespository: Repository<Category> = AppDataSource.getRepository(Category)

    const addressExists = addressRepository.find({
        where: {
            city: realEstateData.address.city,
            state: realEstateData.address.state,
            street: realEstateData.address.street,
            zipCode: realEstateData.address.zipCode
        }
    })

    if((await addressExists).length) throw new AppError("Address already exists", 409)

    const newAddress = addressRepository.create(realEstateData.address)
    await addressRepository.save(newAddress)
    const addReturn = addressSchemaReturn.parse(newAddress)

    let category = null
    if(realEstateData.categoryId){
        category = await categoryRespository.findOne({
            where: {
                id: realEstateData.categoryId
            }
        })
    }

    const create = {
        value: realEstateData.value,
        size: realEstateData.size,
        address: addReturn,
        category: category,
    }

    const newRealEstate = realEstateRepository.create(create)
    await realEstateRepository.save(newRealEstate)

    return newRealEstate

}

export default createRealEstateService