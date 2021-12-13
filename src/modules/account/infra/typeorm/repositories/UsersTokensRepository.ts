import { ICreateUserTokenDTO } from "@modules/account/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/account/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UserTokens } from "../entities/UserTokens";


class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserTokens>

    constructor(){
        this.repository = getRepository(UserTokens)
    }

    async deleteById(id: string): Promise<void> {
         await this.repository.delete(id)
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        return await this.repository.findOne({
            user_id,
            refresh_token
        })
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
       const userToken = this.repository.create({
           expires_date,
           refresh_token,
           user_id
       })

       await this.repository.save(userToken)

       return userToken;
    }
    

}

export {
    UsersTokensRepository
}