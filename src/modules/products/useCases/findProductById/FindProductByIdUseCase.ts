import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindProductByIdUseCase {

    constructor(
        @inject("ProductsRepository")
        private repository: IProductsRepository
    ){}

    async execute(id: string): Promise<Product>{
        return await this.repository.findById(id);
    }
}

export {
    FindProductByIdUseCase
}