import { ICreateBankAccountDTO } from "@modules/account/dtos/ICreateBankAccountDTO";
import { IBankAccountsRepository } from "@modules/account/repositories/IBankAccountsRepository";
import { getRepository, Repository } from "typeorm";
import { BankAccount } from "../entities/BankAccount";

class BankAccountsRepository implements IBankAccountsRepository {
    private repository: Repository<BankAccount>

    constructor(){
        this.repository = getRepository(BankAccount)
    }

   async getBankAccountAdmin(): Promise<BankAccount> {
        return await this.repository.findOne({
            where: { isAdmin: true }
        })
    }
    
   async findByUserId(user_id: string, isAdmin: boolean): Promise<BankAccount>{
        return await this.repository.findOne({
            where: {
                user_id,
                isAdmin
            }
        })
    }

    async create(data: ICreateBankAccountDTO): Promise<void> {
        const existsBankAccount = await this.findByUserIdAndIsAdmin(data.user_id);
        if(existsBankAccount){
            await this.repository.save({id: existsBankAccount.id, ...data});
            return;
        }
        const bankAccount = this.repository.create(data)

        await this.repository.save(bankAccount);
    }

    private async findByUserIdAndIsAdmin(user_id: string){
       return await this.repository.findOne({
           where: [
               {user_id},
               {isAdmin: true}
           ]
       });
    }
}

export {
    BankAccountsRepository
}