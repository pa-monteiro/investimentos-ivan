import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveProductsUseCase {

    constructor(
        @inject("ProductsRepository")
        private repository: IProductsRepository
    ){}

    async execute(ids: string[]): Promise<void>{
        if(!ids){
            throw new AppError('Selecione ao menos um elemento');
        }

        await this.repository.removeIds(ids);
    }
}

export {
    RemoveProductsUseCase
}