import { IUpdateUserDTO } from "@modules/account/dtos/IUpdateUserDTO";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ){}

    async execute(id: string, data: IUpdateUserDTO): Promise<void>{
        await this.repository.updateById(id, data);
    }
}

export {
    UpdateUserUseCase
}