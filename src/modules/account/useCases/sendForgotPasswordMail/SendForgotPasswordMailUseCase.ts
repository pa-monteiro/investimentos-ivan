import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { v4 } from 'uuid'
import { resolve } from 'path'

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private userTokensRepository: IUsersTokensRepository,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ){}

    async execute(email: string): Promise<void>{
        const user = await this.userRepository.findByEmail(email);
        if(!user){
            throw new AppError("Usuário não existe!");
        }

        
        
        const token = v4();
        const expires_date = this.dateProvider.addHours(3);
        await this.userTokensRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date
        })
        
        const templatePath = resolve(__dirname, '..', '..', 'views', 'emails', 'forgotPassword.hbs');
        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_MAIL_URL}${token}`
        }

        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            variables,
            templatePath
            )
    }
}

export {
    SendForgotPasswordMailUseCase
}