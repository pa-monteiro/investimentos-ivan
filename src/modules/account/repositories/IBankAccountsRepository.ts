import { ICreateBankAccountDTO } from "../dtos/ICreateBankAccountDTO";
import { BankAccount } from "../infra/typeorm/entities/BankAccount";

export interface IBankAccountsRepository {
    create(data: ICreateBankAccountDTO): Promise<void>;
    findByUserId(user_id:string, isAdmin: boolean):Promise<BankAccount>
}