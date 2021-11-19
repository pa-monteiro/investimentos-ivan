import { User } from "@modules/account/infra/typeorm/entities/User";
import { ICreateDailyPostingDTO } from "@modules/daily_posting/dtos/ICreateDailyPostingDTO";
import { IDailyPosting } from "@modules/daily_posting/repositories/IDailyPosting";
import { Payment } from "@modules/payments/infra/typeorm/entities/Payment";
import dayjs from "dayjs";
import { Between, getRepository, Repository } from "typeorm";
import { DailyPosting } from "../entities/DailyPosting";

class DailyPostingRepository implements IDailyPosting {
    private repository: Repository<DailyPosting>
    private userRepository: Repository<User>
    private paymentsRepository: Repository<Payment>

    constructor(){
        this.repository = getRepository(DailyPosting)
        this.userRepository = getRepository(User)
        this.paymentsRepository = getRepository(Payment)
    }

    async getValuesToDashboardAdmin() {
        const startMonth = dayjs().startOf("month").toDate();
        const endMonth = dayjs().endOf("month").toDate();

        const valueTotalFund = await this.repository
        .find({
            where: {
                date: Between(startMonth,endMonth)
            }
        });

        const valueTotal = valueTotalFund.reduce((acc,value) => acc += Number(parseFloat(value.value).toFixed(2))
        , 0);

        return {
            valueTotal
        };
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


}

export {
    DailyPostingRepository
}