import { ICreateUserDto } from "@modules/account/dtos/ICreateUserDto";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({driver_license, email, name, password }: ICreateUserDto): Promise<void> {
        const user = new User();

        Object.assign(user, {
            driver_license, email, name, password
        });

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }

}

export default UsersRepositoryInMemory;