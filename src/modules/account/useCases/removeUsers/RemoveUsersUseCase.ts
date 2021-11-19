import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class RemoveUsersUseCase {

    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ){}

    async execute(ids: string[]): Promise<void>{
        if(!ids){
            throw new AppError('Selecione ao menos um elemento');
        }

        await this.repository.removeIds(ids);
    }
}

export {
    RemoveUsersUseCase
}