import { CreatePaymentDTO } from "@modules/payments/dtos/CreatePaymentDTO";
import { Payment } from "@modules/payments/infra/typeorm/entities/Payment";
import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CreatePaymentUseCase {

    constructor(
        @inject("PaymentsRepository")
        private repository: IPaymentRepository
    ){}

    async execute(data: CreatePaymentDTO): Promise<Payment> {
        return await this.repository.create(data);
    }

}

export {
    CreatePaymentUseCase
}