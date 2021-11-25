import { ICreateBankAccountDTO } from "@modules/account/dtos/ICreateBankAccountDTO";
import { IBankAccountsRepository } from "@modules/account/repositories/IBankAccountsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateBankAccountUseCase {

    constructor(
        @inject("BankAccountsRepository")
        private repository: IBankAccountsRepository
    ){}

    async execute(data: ICreateBankAccountDTO): Promise<void>{
            await this.repository.create(data);
    }

}

export {
    CreateBankAccountUseCase
}