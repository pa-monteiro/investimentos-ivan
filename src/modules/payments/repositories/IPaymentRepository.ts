import { CreatePaymentDTO } from "../dtos/CreatePaymentDTO";
import { Payment } from "../infra/typeorm/entities/Payment";

export interface IPaymentRepository {
    create(data: CreatePaymentDTO): Promise<Payment>;
    findByUserId(id: string);
    findById(id: string): Promise<Payment>;
    findAll(): Promise<Payment[]>;
    accept(id: string, user_id: string): Promise<Payment>;
    canceled(id: string, user_id: string): Promise<Payment>;
    filterByUserIdAndProduct(user_id:string, product_id: string);
    listValueTotalAndValueAvailableByProduct(user_id: string);
    getValueTotalOrByProductId(user_id: string, product_id?: string): Promise<number>;
}