import { CreatePaymentDTO } from "../dtos/CreatePaymentDTO";
import { Payment } from "../infra/typeorm/entities/Payment";

export interface IPaymentRepository {
    create(data: CreatePaymentDTO): Promise<Payment>;
    findByUser(id: string);
}