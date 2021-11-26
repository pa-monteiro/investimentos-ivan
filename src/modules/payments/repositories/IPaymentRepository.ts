import { CreatePaymentDTO } from "../dtos/CreatePaymentDTO";
import { Payment } from "../infra/typeorm/entities/Payment";

export interface IPaymentRepository {
    create(data: CreatePaymentDTO): Promise<Payment>;
    findByUserId(id: string);
    findById(id: string): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    accept(id: string, user_id: string): Promise<Payment>;
    canceled(id: string, user_id: string): Promise<Payment>;
}