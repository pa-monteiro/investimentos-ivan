import { ICreateUserDto } from "@modules/account/dtos/ICreateUserDto";
import { IUpdateUserDTO } from "@modules/account/dtos/IUpdateUserDTO";
import { User } from "@modules/account/infra/typeorm/entities/User";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create(data: ICreateUserDto): Promise<User> {
        const user = new User();

        Object.assign(user, data);

        this.users.push(user);

        return user;
    }

    updateById(id: string, { deadline, email, name}: IUpdateUserDTO): Promise<void> {
        const user = this.users.find(u => u.id === id);

        user.email = email;
        user.deadline = deadline;
        user.name = name;

        this.users.push(user);
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find(user => user.email === email);
    }

    async findById(id: string): Promise<User> {
        return this.users.find(user => user.id === id);
    }

    async listAll(): Promise<User[]> {
        return this.users;
    }

    async removeIds(ids: string[]): Promise<void> {
        const users = this.users.filter(u => !ids.includes(u.id))

        this.users = users;
    }

}

export default UsersRepositoryInMemory;