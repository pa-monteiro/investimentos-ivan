import { ICreateBankAccountDTO } from "@modules/account/dtos/ICreateBankAccountDTO";
import { IBankAccountsRepository } from "@modules/account/repositories/IBankAccountsRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateBankAccountUseCase {

    constructor(
        @inject("BankAccountsRepository")
        private repository: IBankAccountsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute(data: ICreateBankAccountDTO): Promise<void>{
        const user = await this.usersRepository.findById(data.user_id);
        data.isAdmin = false;
        if(user.isAdmin){
            data.isAdmin = true;
        }
        await this.repository.create(data);
    }

}

export {
    CreateBankAccountUseCase
}