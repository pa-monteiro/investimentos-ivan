import { IUpdateUserDTO } from "@modules/account/dtos/IUpdateUserDTO";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ){}

    async execute(id: string, data: IUpdateUserDTO, products: string[]): Promise<void>{
        const user = await this.repository.updateById(id, data);

        if(products){
            const product = await this.productsRepository.findByIds(products);
            user.products = product;
    
            await this.repository.create(user);
        }
    }
}

export {
    UpdateUserUseCase
}