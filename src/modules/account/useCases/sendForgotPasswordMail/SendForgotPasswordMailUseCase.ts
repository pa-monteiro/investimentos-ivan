import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class SendForgotPasswordMailUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUsersRepository,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ){}

    async execute(email: string): Promise<void>{
        const user = await this.userRepository.findByEmail(email);
        if(!user){
            throw new AppError("Usuário não existe!");
        }

        await this.mailProvider.sendMail(email, "Recuperação de senha", "Teste")
    }
}

export {
    SendForgotPasswordMailUseCase
}