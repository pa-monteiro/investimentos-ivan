import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetValueTotalAndValueAvailableByProductUseCase {

    constructor(
        @inject("PaymentsRepository")
        private repository: IPaymentRepository
    ){}

    async execute(user_id: string){
        return await this.repository.listValueTotalAndValueAvailableByProduct(user_id)
    }
}

export {
    GetValueTotalAndValueAvailableByProductUseCase
}