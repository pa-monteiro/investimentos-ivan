import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "../IProductsRepository";

class InMemoryProductsRepository implements IProductsRepository {
    products:Product[] = [];
   
    async create({ name, type }: ICreateProductDTO): Promise<Product> {
       const product = new Product();

       Object.assign(product, {
           name,
           type
       })

       this.products.push(product);

       return product;
    }

}

export {
    InMemoryProductsRepository
}