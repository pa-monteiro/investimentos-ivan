import { Payment } from "@modules/payments/infra/typeorm/entities/Payment";
import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class GetNotificationsAdminUseCase {

    constructor(
        @inject("PaymentsRepository")
        private repository: IPaymentRepository
    ){}

    async execute(): Promise<Payment[]>{
        return await this.repository.notificationPendenciasAdmin();
    }
}

export {
    GetNotificationsAdminUseCase
}