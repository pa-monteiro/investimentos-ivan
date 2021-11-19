import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IResponse {
    name: string;
    email: string;
    deadline: number;
    products?: string[];
}

@injectable()
class ListUsersUseCase {
    constructor(
        @inject("UsersRepository")
        private repository: IUsersRepository
    ){}

    async execute(): Promise<User[]>{
       const users = await this.repository.listAll();

       return users;
    }
}

export {
    ListUsersUseCase
}