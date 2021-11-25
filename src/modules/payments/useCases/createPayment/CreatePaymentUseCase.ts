import { CreatePaymentDTO } from "@modules/payments/dtos/CreatePaymentDTO";
import { Payment, PaymentStatusEnum } from "@modules/payments/infra/typeorm/entities/Payment";
import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";
import multer from "multer";
import uploadConfig from '@config/upload'

@injectable()
class CreatePaymentUseCase {

    constructor(
        @inject("PaymentsRepository")
        private repository: IPaymentRepository
    ){}

    async execute(data: CreatePaymentDTO): Promise<Payment> {
        data.status = PaymentStatusEnum.PENDING;
        return await this.repository.create(data);
    }

}

export {
    CreatePaymentUseCase
}