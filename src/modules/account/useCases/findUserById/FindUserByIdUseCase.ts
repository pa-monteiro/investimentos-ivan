import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IResponse {
    name: string;
    email: string;
    deadline: number;
}

@injectable()
class FindUserByIdUseCase {
    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ){}
    async execute(id: string): Promise<User>{
        return await this.repository.findById(id);
    }
}

export {
    FindUserByIdUseCase
}