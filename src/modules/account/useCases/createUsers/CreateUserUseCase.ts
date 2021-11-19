import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICreateUserDto } from "@modules/account/dtos/ICreateUserDto";
import { hash } from 'bcrypt'
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { User } from "@modules/account/infra/typeorm/entities/User";

@injectable()
class CreateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository
    ){}

    async execute({name, email,deadline, password }: ICreateUserDto, products: string[]) : Promise<User>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if(userAlreadyExists){
            throw new AppError('Usuário já está cadastrado.')
        }
        
        const passwordHash = await hash(password, 8);
        const user = await this.usersRepository.create({name, email,deadline, password: passwordHash})
        if(products){
            const product = await this.productsRepository.findByIds(products);
    
            user.products = product;
    
            const userUpdated = await this.usersRepository.create(user);
            
            return userUpdated;
        }
        return user;

    }
}

export {
    CreateUserUseCase
}