import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { getRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";

class ProductsRepository implements IProductsRepository {
    private repository: Repository<Product>

    constructor(){
        this.repository = getRepository(Product);
    }

    async create(data: ICreateProductDTO): Promise<Product> {
       const product = this.repository.create(data);

       return await this.repository.save(product);
    }

}

export {
    ProductsRepository
}