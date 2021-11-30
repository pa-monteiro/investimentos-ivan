import { IUsersRepository } from "@modules/account/repositories/IUsersRepository"
import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
    user_id: string;
    product_id: string;
    type:string;
    value: number;
}

@injectable()
class WithdrawPaymentUseCase {

    constructor(
        @inject("PaymentsRepository")
        private repository: IPaymentRepository
    ){}
    async execute({ user_id, product_id, value, type }: IRequest){
        const products = await this.repository.filterByUserIdAndProduct(user_id, product_id);

        if(products.length === 0){
            throw new AppError("Não existe valor disponível para retirada!")
        }

       const entries = products.filter(product => product.type === 'entries').reduce((acc, product) => {
           return acc + parseFloat(product.value)
        },0);

        const exits = products.filter(product => product.type === 'exits').reduce((acc, product) => {
            return acc + parseFloat(product.value)
         },0);

         const result = entries - exits;

         if(Math.sign(result) < 0){
            throw new AppError("Não existe valor disponível para retirada!")
        }

        if(result < value){
            throw new AppError("Não existe valor disponível para retirada!")
        }
        return result;

        return await this.repository.create({
            product_id,
            user_id,
            value,
            type,
            status: 'pending'
        });
    }

}

export {
    WithdrawPaymentUseCase
}