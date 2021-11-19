import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "../IProductsRepository";

class InMemoryProductsRepository implements IProductsRepository {
    update(id: string, data: ICreateProductDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
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
    
    removeIds(ids: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
    async findById(id: string): Promise<Product> {
        return this.products.find(p => p.id === id);
    }

    async findByIds(ids: string[]): Promise<Product[]> {
        return this.products.filter(p => ids.includes(p.id))
    }

    async listAll(): Promise<Product[]> {
      return this.products;
    }

}

export {
    InMemoryProductsRepository
}