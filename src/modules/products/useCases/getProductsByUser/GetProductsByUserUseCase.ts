import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetProductsByUserUseCase {
    
    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ){}
    async execute(id: string){
        return await this.repository.findByUserIdProducts(id);
    }

}

export {
    GetProductsByUserUseCase
}