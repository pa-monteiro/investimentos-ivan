import { ICreateUserDto } from "@modules/account/dtos/ICreateUserDto";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";

interface IUsersRepository{
    create(data: ICreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    listAll(): Promise<User[]>;
    removeIds(ids: string[]): Promise<void>;
    updateById(id: string, data: IUpdateUserDTO): Promise<void>;
    findByUserIdProducts(id: string): Promise<User>;
}

export {
    IUsersRepository
}