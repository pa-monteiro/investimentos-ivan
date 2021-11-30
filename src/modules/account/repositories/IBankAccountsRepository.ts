import { ICreateBankAccountDTO } from "../dtos/ICreateBankAccountDTO";

export interface IBankAccountsRepository {
    create(data: ICreateBankAccountDTO): Promise<void>;
}