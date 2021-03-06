import { getRepository, Repository } from "typeorm";

import { User } from "@modules/account/infra/typeorm/entities/User";
import { ICreateUserDto } from "@modules/account/dtos/ICreateUserDto";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUpdateUserDTO } from "@modules/account/dtos/IUpdateUserDTO";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor(){
        this.repository = getRepository(User)
    }

    async findByUserIdProducts(id: string): Promise<User> {
       return await this.repository.findOne(id,{
           relations: ['products']
       });
    }

    async updateById(id: string, data: IUpdateUserDTO): Promise<User> {
        const user = await this.repository.findOne(id);

        return await this.repository.save({id,...data})
    }

    async removeIds(ids: string[]): Promise<void> {
       ids.map(async id => {
           await this.repository.delete({id});
       });
    }
    
    async listAll(): Promise<User[]> {
        return await this.repository.find({
            select: ["id", "name", "email", "phone"],
            relations: ["products"]
        });
    }

    async create(data: ICreateUserDto): Promise<User> {
        const user = this.repository.create(data)

        await this.repository.save(user);

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({
            where: {email},
            select: ['id','name','isAdmin','email','password']
        })
    }

    async findById(id: string): Promise<User>{
        return await this.repository.findOne(id, {
            relations: ['products']
        })
    }

    async findByIds(ids: string[]): Promise<User[]>{
        return await this.repository.findByIds(ids);
    }

}

export {
    UsersRepository
}