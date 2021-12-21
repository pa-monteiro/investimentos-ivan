import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { hash } from 'bcrypt'

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ){}

    async execute({token, password}: IRequest): Promise<void>{
        console.log(token)
        console.log(password)
        const userToken = await this.usersTokensRepository.findByRefreshToken(token);
        if(!userToken){
            throw new AppError("Token not found")
        }

        if(this.dateProvider.compareIfBefore(userToken.expires_date, this.dateProvider.dateNow())){
            throw new AppError("Token expired!")
        }

        const user = await this.usersRepository.findById(userToken.user_id)
        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokensRepository.deleteById(userToken.id);

    }

}

export {
    ResetPasswordUserUseCase
}