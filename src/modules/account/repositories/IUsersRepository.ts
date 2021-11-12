import { ICreateUserDto } from "@modules/account/dtos/ICreateUserDto";
import { User } from "@modules/account/infra/typeorm/entities/User";

interface IUsersRepository{
    create(data: ICreateUserDto): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export {
    IUsersRepository
}