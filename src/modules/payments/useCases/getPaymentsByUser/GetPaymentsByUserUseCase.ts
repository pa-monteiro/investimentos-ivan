import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository"
import { inject, injectable } from "tsyringe"

@injectable()
class GetPaymentsByUserUseCase {

    constructor(
        @inject("PaymentsRepository")
        private repository: IPaymentRepository
    ){}
    async execute(id: string){
        return await this.repository.findByUserId(id);
    }
}

export {
    GetPaymentsByUserUseCase
}