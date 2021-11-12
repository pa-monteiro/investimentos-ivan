import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "../infra/typeorm/entities/Product";

interface IProductsRepository {
    create(data: ICreateProductDTO): Promise<Product>
}

export {
    IProductsRepository
}