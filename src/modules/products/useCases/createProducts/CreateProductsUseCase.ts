import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateProductsUseCase {
    constructor(
        @inject("ProductsRepository")
        private repository: IProductsRepository
    ){}

    async execute(data: ICreateProductDTO): Promise<Product>{
        return await this.repository.create(data);
    }

}

export {
    CreateProductsUseCase
}