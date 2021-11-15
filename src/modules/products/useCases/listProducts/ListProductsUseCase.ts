import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListProductsUseCase {

    constructor(
        @inject("ProductsRepository")
        private repository: IProductsRepository){}

    async execute(): Promise<Product[]>{
        return await this.repository.listAll();
    }
}

export {
    ListProductsUseCase
}