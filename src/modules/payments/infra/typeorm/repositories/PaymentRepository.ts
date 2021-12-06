import { CreatePaymentDTO } from "@modules/payments/dtos/CreatePaymentDTO";
import { IPaymentRepository } from "@modules/payments/repositories/IPaymentRepository";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import 'dayjs/locale/pt-br'
import { getRepository, Repository } from "typeorm";
import { Payment, PaymentStatusEnum } from "../entities/Payment";
import { PaymentUser } from "../entities/PaymentUser";


dayjs.extend(utc)
dayjs.locale('pt-br')
dayjs.extend(tz)
dayjs.tz.setDefault("America/Sao_Paulo")

class PaymentRepository implements IPaymentRepository{
    private repository: Repository<Payment>
    private paymentsUserRepository: Repository<PaymentUser>

    constructor(){
        this.repository = getRepository(Payment),
        this.paymentsUserRepository = getRepository(PaymentUser)
    }

    async getValueTotalOrByProductId(user_id: string, product_id?: string): Promise<number> {
        const payment = await this.paymentsUserRepository.createQueryBuilder()
        .where("user_id = :user_id", {
            user_id,
        }).getOne();

        if(product_id){
            const payment = await this.repository.createQueryBuilder("payments")
            .where("user_id = :user_id AND product_id = :product_id AND release_date => :dateNow ::date", {
                user_id,
                product_id,
                dateNow: dayjs()
            }).getOne();

            return payment.value;
        }
        
        return Number(payment.value);
    }

    async findAll(): Promise<Payment[]>{
        return await this.repository.createQueryBuilder("payments")
        .select([
            'payments.id','payments.type','payments.value','payments.created_at','payments.release_date','payments.start_date','payments.status','payments.receipt_image',
            'product.id','product.name',
            'user.id','user.name'
        ])
        .leftJoin('payments.product','product')
        .leftJoin('payments.user','user')
        .orderBy('payments.created_at', 'DESC')
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
        .select(['payments.id','payments.type','payments.value','payments.created_at','payments.release_date','payments.start_date','payments.status','payments.receipt_image','product.id','product.name'])
        .where({user_id: id})
        .leftJoin('payments.product','product')
        .orderBy('payments.created_at', 'DESC')
        .getMany();

        return allValues;
    }

    async create(data: CreatePaymentDTO) {
        const payment = this.repository.create(data);
        const create = await this.repository.save(payment);

        const { 
            product_id,
            user_id,
            value
        } = data;

        const paymentUser = await this.paymentsUserRepository.findOne({
            where: {
                product_id,
                user_id
            }
        });
        if(paymentUser){
            paymentUser.value = Number(paymentUser.value) + Number(value);
            await this.paymentsUserRepository.save(paymentUser);
        }else{
            const transaction = this.paymentsUserRepository.create(data);
            await this.paymentsUserRepository.save(transaction);    
        }

        return create;
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