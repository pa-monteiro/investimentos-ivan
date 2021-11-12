import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { ICreateUserDto } from "@modules/account/dtos/ICreateUserDto";
import { hash } from 'bcrypt'
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({name, email,driver_license,password}: ICreateUserDto) : Promise<void>{
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if(userAlreadyExists){
            throw new AppError('User already exists.')
        }
        
        const passwordHash = await hash(password, 8);
        await this.usersRepository.create({name, email,driver_license,password: passwordHash})
    }
}

export {
    CreateUserUseCase
}