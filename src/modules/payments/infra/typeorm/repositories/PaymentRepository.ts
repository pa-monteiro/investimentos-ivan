import { CreatePaymentDTO } from "@modules/payments/dtos/CreatePaymentDTO";
import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import 'dayjs/locale/pt-br'
import { getRepository, Repository } from "typeorm";
import { Payment, PaymentStatusEnum } from "../entities/Payment";


dayjs.extend(utc)
dayjs.locale('pt-br')
dayjs.extend(tz)
dayjs.tz.setDefault("America/Sao_Paulo")

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
        const payment = await this.repository.findOne(id, {
            relations: ['user', 'userAcceptedBy', 'product']
        });

        if(payment.start_date){
            payment.release_date = dayjs(payment.release_date).format('DD/MM/YYYY');
            payment.start_date = dayjs(payment.start_date).format('DD/MM/YYYY');
        }
        

        return payment;
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

    async accept(id: string, user_id: string): Promise<Payment>{
        const payment = await this.repository.findOne(id,{
            relations: ['product']
        });

        payment.start_date = new Date(dayjs().add(payment.product.deadline_contribution, 'day').tz('America/Sao_Paulo').format('YYYY-MM-DD'));
        payment.release_date = new Date(dayjs().add(payment.product.withdrawal_deadline, 'day').tz('America/Sao_Paulo').format('YYYY-MM-DD'));
        payment.accepted_at = dayjs().tz('America/Sao_Paulo').format();
        payment.accepted_by = user_id;
        payment.status = PaymentStatusEnum.ACCEPTED;

        await this.repository.save(payment);

        return payment;
    }

    async canceled(id: string, user_id:string):Promise<Payment>{
        const payment = await this.repository.findOne(id);

        payment.accepted_at = dayjs().tz('America/Sao_Paulo').format();
        payment.accepted_by = user_id;
        payment.status = PaymentStatusEnum.CANCELED;

        await this.repository.save(payment);

        return payment;
    }

    async filterByUserIdAndProduct(user_id: string, product_id: string){
        const dateNow = dayjs().tz('America/Sao_Paulo').format('YYYY-MM-DD');
        return await this.repository.createQueryBuilder("payments")
        .where("payments.user_id = :user_id", { user_id})
        .andWhere("payments.product_id = :product_id", { product_id })
        .andWhere("payments.status = :status OR payments.status = :status2", { status: 'accepted', status2: 'pending'})
        // .andWhere("payments.release_date::date < :dateNow", { dateNow})
        .getMany();
    }

    // solicitar retirada - verifica se estiver livre, se sim verifica o valor, se sim, muda o status para pending and type exits, se aceitar, remove o valor do fundo

}

export {
    PaymentRepository
}