import { ICreateDailyPostingDTO } from "../dtos/ICreateDailyPostingDTO";
import { DailyPosting } from "../infra/typeorm/entities/DailyPosting";

export interface IDailyPosting {
    create(data: ICreateDailyPostingDTO): Promise<DailyPosting>;
    update(data: ICreateDailyPostingDTO): Promise<DailyPosting>;
    getValuesToDashboardAdmin();
    getValuesToDashboard(user_id: string);
    getValuesToIndicatorsReport();
    getDailyPostingsByMonth();
}