import { getRepository, Repository } from "typeorm";

import { User } from "@modules/account/infra/typeorm/entities/User";
import { ICreateUserDto } from "@modules/account/dtos/ICreateUserDto";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor(){
        this.repository = getRepository(User)
    }

    async create({name, email, driver_license, password, avatar, id}: ICreateUserDto): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            driver_license,
            password,
            avatar,
            id
        })

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({email})
    }

    async findById(id: string): Promise<User>{
        return await this.repository.findOne(id)
    }

}

export {
    UsersRepository
}