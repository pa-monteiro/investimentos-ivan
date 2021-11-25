import { CreatePaymentDTO } from "@modules/payments/dtos/CreatePaymentDTO";
import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import dayjs from "dayjs";
import { getRepository, Repository } from "typeorm";
import { Payment } from "../entities/Payment";

class PaymentRepository implements IPaymentRepository{
    private repository: Repository<Payment>
    private productsRepository: Repository<Product>

    constructor(){
        this.repository = getRepository(Payment)
        this.productsRepository = getRepository(Product)
    }

    async findAll(): Promise<Payment[]>{
        return await this.repository.createQueryBuilder("payments")
        .select([
            'payments.id','payments.type','payments.value','payments.created_at','payments.release_date','payments.start_date','payments.status',
            'product.id','product.name',
            'user.id','user.name'
        ])
        .leftJoin('payments.product','product')
        .leftJoin('payments.user','user')
        .getMany();
    }

    async findById(id: string): Promise<Payment> {
        return await this.repository.findOne(id, {
            relations: ['user', 'userAcceptedBy', 'product']
        })
    }

    async findByUserId(id: string) {
        const allValues = await this.repository.createQueryBuilder("payments")
        .select(['payments.id','payments.type','payments.value','payments.created_at','payments.release_date','payments.start_date','payments.status','product.id','product.name'])
        .where({user_id: id})
        .leftJoin('payments.product','product')
        .getMany();

        return allValues;
    }

    async create(data: CreatePaymentDTO) {
        const payment = this.repository.create(data);
        return await this.repository.save(payment);
    }

    async acceptPayment(data){
        const product = await this.productsRepository.findOne(data.product_id);
        
        if(data.type === 'entries'){
            data.date_release = dayjs().add(product.deadline_contribution, 'day').toDate();
        }else {
            data.date_release = dayjs().add(product.withdrawal_deadline, 'day').toDate();
        }
    }

}

export {
    PaymentRepository
}