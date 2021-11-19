import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateProductsUseCase {

    constructor(
        @inject("ProductsRepository")
        private repository: IProductsRepository
    ){}

    async execute(id: string, data: ICreateProductDTO): Promise<void>{
        await this.repository.update(id, data);
    }
}

export {
    UpdateProductsUseCase
}