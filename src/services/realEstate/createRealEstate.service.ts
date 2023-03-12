import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Address, RealEstate } from "../../entities";
import { iRealEstate } from "../../interfaces/realEstate.interfaces";
import { addressSchemaReturn } from "../../schemas/address.schemas";
import { returnRealEstateSchema } from "../../schemas/realEstate.schema";

const createRealEstateService = async (realEstateData: iRealEstate): Promise<any> => {

    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)
    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const newAddress = addressRepository.create(realEstateData.address)
    await addressRepository.save(newAddress)
    const returnAddress = addressSchemaReturn.parse(newAddress)

    const newRealEstate:any = realEstateRepository.create(realEstateData)
    delete newRealEstate.address
    newRealEstate.addressId = returnAddress.id
    console.log(newRealEstate)
    await realEstateRepository.save(newRealEstate)
    const createEstateData = returnRealEstateSchema.parse(newRealEstate)

    return createEstateData

}

export default createRealEstateService