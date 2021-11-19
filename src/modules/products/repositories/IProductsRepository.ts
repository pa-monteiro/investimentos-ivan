import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "../infra/typeorm/entities/Product";

interface IProductsRepository {
    create(data: ICreateProductDTO): Promise<Product>
    findByIds(ids: string[]): Promise<Product[]>
    listAll(): Promise<Product[]>
    removeIds(ids: string[]): Promise<void>
    findById(id: string): Promise<Product>;
    update(id:string, data: ICreateProductDTO):Promise<void>;
}

export {
    IProductsRepository
}