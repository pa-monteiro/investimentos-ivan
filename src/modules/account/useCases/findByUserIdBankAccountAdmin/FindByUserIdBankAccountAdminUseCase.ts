import { BankAccount } from "@modules/account/infra/typeorm/entities/BankAccount";
import { IBankAccountsRepository } from "@modules/account/repositories/IBankAccountsRepository";
import { IUsersRepository } from "@modules/account/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindByUserIdBankAccountAdminUseCase {

    constructor(
        @inject("BankAccountsRepository")
        private repository: IBankAccountsRepository
    ){}

    async execute(): Promise<BankAccount>{
        const bankAccount = await this.repository.getBankAccountAdmin();

        return bankAccount;
    }
}

export {
    FindByUserIdBankAccountAdminUseCase
}