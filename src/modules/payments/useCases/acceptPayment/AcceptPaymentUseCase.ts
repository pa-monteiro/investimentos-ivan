import { Payment, PaymentStatusEnum } from "@modules/payments/infra/typeorm/entities/Payment";
import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class AcceptPaymentUseCase {

    constructor(
        @inject("PaymentsRepository")
        private repository: IPaymentRepository
    ){}

    async execute(id: string, user_id: string): Promise<Payment>{
        const payment = await this.repository.findById(id);
        if(payment.status !== PaymentStatusEnum.PENDING){
            throw new AppError(`Não é possível aceitar este pagamento. Status atual: ${payment.status}`)
        }
       return await this.repository.accept(id, user_id);
    }
}

export {
    AcceptPaymentUseCase
}