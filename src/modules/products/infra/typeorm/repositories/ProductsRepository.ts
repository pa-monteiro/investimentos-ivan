import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { getRepository, Repository } from "typeorm";
import { Product } from "../entities/Product";

class ProductsRepository implements IProductsRepository {
    private repository: Repository<Product>

    constructor(){
        this.repository = getRepository(Product);
    }

    async update(id: string, data: ICreateProductDTO): Promise<void> {
         await this.repository.update(id, data)
    }

    async findById(id: string): Promise<Product> {
        return await this.repository.findOne(id)
    }

    async removeIds(ids: string[]): Promise<void> {
       ids.map(async id => {
           await this.repository.delete({id});
       });
    }

    async listAll(): Promise<Product[]> {
        return await this.repository.find();
    }

    async findByIds(ids: string[]): Promise<Product[]> {
        return await this.repository.findByIds(ids);
    }

    async create(data: ICreateProductDTO): Promise<Product> {
       const product = this.repository.create(data);
       
       return await this.repository.save(product);
    }

}

export {
    ProductsRepository
}