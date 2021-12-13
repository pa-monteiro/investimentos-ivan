import { IUsersRepository } from "@modules/account/repositories/IUsersRepository"
import { inject, injectable } from "tsyringe"
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AppError } from "@shared/errors/AppError";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import auth from "@config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

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
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokenRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsProvider: IDateProvider
    ){}
    async execute({email, password} : IRequest) : Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        const { expires_in_token, secret_token, expires_refresh_token_days, secret_refresh_token, expires_in_refresh_token } = auth;
        if(!user){
            throw new AppError("Email or password incorrect.")
        }
        
        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new AppError("Email or password incorrect.")
        }

        const refresh_token = sign({ email }, secret_refresh_token,{
            subject: user.id,
            expiresIn: expires_in_refresh_token
        })

        await this.usersTokenRepository.create({
            expires_date: this.dayjsProvider.addDays(expires_refresh_token_days),
            refresh_token,
            user_id: user.id
        })

        const tokenReturn: IResponse = {
            token: refresh_token,
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