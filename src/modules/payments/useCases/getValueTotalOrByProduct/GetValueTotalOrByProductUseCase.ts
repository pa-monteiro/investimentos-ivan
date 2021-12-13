import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetValueTotalOrByProductUseCase {

    constructor(
        @inject("PaymentsRepository")
        private paymentRepository: IPaymentRepository
    ){}

    async execute(user_id: string, product_id: string){
        console.log('bateu aqui')
        return await this.paymentRepository.getValueTotalOrByProductId(user_id, product_id);    
    }

}

export {
    GetValueTotalOrByProductUseCase
}