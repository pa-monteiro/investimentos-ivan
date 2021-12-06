import { IUsersRepository } from "@modules/account/repositories/IUsersRepository"
import { inject, injectable } from "tsyringe"
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        id: string;
        name: string;
        email: string;
        isAdmin: boolean;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}
    async execute({email, password} : IRequest) : Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if(!user){
            throw new AppError("Email or password incorrect.")
        }
        
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new AppError("Email or password incorrect.")
        }

        const token = sign({}, "998c77fb9d94e2d2edd73e5431b9af88", {
            subject: user.id,
            expiresIn: '1d'
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            }
        }

        return tokenReturn;
    }
}

export { 
    AuthenticateUserUseCase
}