import { Payment } from "@modules/payments/infra/typeorm/entities/Payment";
import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindAllUseCase {

    constructor(
        @inject("PaymentsRepository")
        private repository: IPaymentRepository
    ){}

    async execute(): Promise<Payment[]>{
        return await this.repository.findAll();
    }
}

export {
    FindAllUseCase
}