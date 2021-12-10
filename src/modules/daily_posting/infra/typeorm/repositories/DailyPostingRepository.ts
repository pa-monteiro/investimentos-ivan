import _ from 'lodash';
import { User } from "@modules/account/infra/typeorm/entities/User";
import { ICreateDailyPostingDTO } from "@modules/daily_posting/dtos/ICreateDailyPostingDTO";
import { IDailyPosting } from "@modules/daily_posting/repositories/IDailyPosting";
import { Payment } from "@modules/payments/infra/typeorm/entities/Payment";
import { PaymentUser } from "@modules/payments/infra/typeorm/entities/PaymentUser";
import dayjs from "dayjs";
import { Between, getRepository, Repository } from "typeorm";
import { DailyPosting } from "../entities/DailyPosting";
import { Product } from '@modules/products/infra/typeorm/entities/Product';

class DailyPostingRepository implements IDailyPosting {
    private repository: Repository<DailyPosting>
    private userRepository: Repository<User>
    private paymentsRepository: Repository<Payment>
    private paymentsUsersRepository: Repository<PaymentUser>
    private productsRepository: Repository<Product>

    constructor(){
        this.repository = getRepository(DailyPosting)
        this.userRepository = getRepository(User)
        this.paymentsRepository = getRepository(Payment)
        this.paymentsUsersRepository = getRepository(PaymentUser)
        this.productsRepository = getRepository(Product)
    }

    async getDailyPostingsByMonth() {
       const startMonth = dayjs().startOf("month").toDate();
        const endMonth = dayjs().endOf("month").toDate();

        return await this.repository
        .find({
            where: {
                date: Between(startMonth,endMonth)
            },
            order: {
                date: 'DESC'
            }
        });
    }

    async getValuesToDashboardAdmin() {
        const startMonth = dayjs().startOf("month").toDate();
        const endMonth = dayjs().endOf("month").toDate();

       const totalLancamentoDiario = await this.repository.createQueryBuilder()
        .select("SUM(value) as TM")
        .where("created_at >= :startMonth ::date AND created_at <= :endMonth ::date", {
            startMonth,
            endMonth
        }).getRawOne();

        let paymentUsers = await this.paymentsUsersRepository.find();
        const products = await this.productsRepository.find();
     
        paymentUsers = this.mergeById(paymentUsers, products);

        var valorTotalFundoPorProduto =
        _(paymentUsers)
          .groupBy('product_id')
          .map((objs, key) => ({
              'product_id': key,
              'product': _.find(objs, 'name'),
              'percentage': _.sumBy(objs, 'percentage'),
              'prop': 0,
              'dtm': 0,
              'pay': 0,
              'rentabilidade': 0,
              'lucro': 0,
              'value': Number(_.sumBy(objs, item => Number(item.value))) }))
          .value();

          const valorTotalFundo = valorTotalFundoPorProduto.reduce((acc, v) => acc + Number(v.value), 0);

          valorTotalFundoPorProduto.map(v => {
              v.prop = Number(((v.value/valorTotalFundo)*100).toFixed(2));
              v.dtm = Number((v.prop * Number(totalLancamentoDiario.tm)).toFixed(2));
              v.pay = Number((v.value * Number(v.percentage)).toFixed(2))
              v.rentabilidade = Number((v.pay/this._numDias()).toFixed(2))
              v.lucro = v.dtm - v.pay
          });

          return valorTotalFundoPorProduto;

    }

    async getValuesToIndicatorsReport(){
        var months = [undefined, 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const array = [];
        for(let i=dayjs().month(); i > -1; i--){
            const startMonth = dayjs().startOf("month").month(i).toDate();
            const endMonth = dayjs().endOf("month").month(i).toDate();
            const users = await this.userRepository.count({
                where: {
                    created_at: Between(startMonth, endMonth)
                }
            });

            const {result} = await this.repository.createQueryBuilder("daily_postings")
            .where("date BETWEEN :prev AND :next", { prev: startMonth, next: endMonth})
            .select("SUM(value) as result")
            .getRawOne();

            const commission = parseFloat(result) * 30 / 100;

            const {entries} = await this.paymentsRepository.createQueryBuilder("payments")
            .where("type = :type", { type: 'entries'})
            .andWhere("created_at BETWEEN :prev AND :next", {prev: startMonth, next: endMonth})
            .select("SUM(value) as entries")
            .getRawOne();

            const {exits} = await this.paymentsRepository.createQueryBuilder("payments")
            .where("payments.type = :type", { type: 'exits'})
            .andWhere("created_at BETWEEN :prev AND :next", {prev: startMonth, next: endMonth})
            .select("SUM(value) as exits")
            .getRawOne();
            

            array.push({
                month: months[i+1],
                resultTotal: parseFloat(result),
                entries: parseFloat(entries),
                exits: parseFloat(exits),
                commission,
                newUsers: users,
            });
        }

        return array;
    }
    
    async create(data: ICreateDailyPostingDTO): Promise<DailyPosting> {
        const daily = this.repository.create(data);

       return await this.repository.save(daily);
    }

    async update(data: ICreateDailyPostingDTO): Promise<DailyPosting> {
        const daily = this.repository.findOne(data.id);

       return await this.repository.save({daily, ...data});
    }

    private mergeById = (a1, a2) =>
    a1.map(itm => ({
       ...a2.find((item) => (item.id === itm.product_id) && item),
       ...itm
    }));

    private _numDias(){
        var objData = new Date(),
            numAno = objData.getFullYear(),
            numMes = objData.getMonth()+1,
            numDias = new Date(numAno, numMes, 0).getDate();
      
        return numDias;
      }

}

export {
    DailyPostingRepository
}