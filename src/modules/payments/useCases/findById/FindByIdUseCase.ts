import { Payment } from "@modules/payments/infra/typeorm/entities/Payment";
import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindByIdUseCase { 

    constructor(
        @inject("PaymentsRepository")
        private repository: IPaymentRepository
    ){}

    async execute(id: string): Promise<Payment>{
        return await this.repository.findById(id);
    }
}

export {
    FindByIdUseCase
}