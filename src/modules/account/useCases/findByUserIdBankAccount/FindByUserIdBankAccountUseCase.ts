import { BankAccount } from "@modules/account/infra/typeorm/entities/BankAccount";
import { IBankAccountsRepository } from "@modules/account/repositories/IBankAccountsRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindByUserIdBankAccountUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("BankAccountsRepository")
        private repository: IBankAccountsRepository
    ){}

    async execute(user_id: string): Promise<BankAccount>{
        const user = await this.usersRepository.findById(user_id);

        let isAdmin = false;
        if(user.isAdmin){
            isAdmin = true;
        }

        const bankAccount = await this.repository.findByUserId(user_id, isAdmin);

        return bankAccount;
    }
}

export {
    FindByUserIdBankAccountUseCase
}