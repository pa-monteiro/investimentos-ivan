import { ICreateDailyPostingDTO } from "@modules/daily_posting/dtos/ICreateDailyPostingDTO";
import { IDailyPosting } from "@modules/daily_posting/repositories/IDailyPosting";
import dayjs from "dayjs";
import { Between, getRepository, Repository } from "typeorm";
import { DailyPosting } from "../entities/DailyPosting";

class DailyPostingRepository implements IDailyPosting {
    private repository: Repository<DailyPosting>

    constructor(){
        this.repository = getRepository(DailyPosting)
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
    
    async create(data: ICreateDailyPostingDTO): Promise<DailyPosting> {
        const daily = this.repository.create(data);

       return await this.repository.save(daily);
    }


}

export {
    DailyPostingRepository
}