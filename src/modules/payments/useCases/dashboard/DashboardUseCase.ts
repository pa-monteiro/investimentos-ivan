import { IDailyPosting } from "@modules/daily_posting/repositories/IDailyPosting";
import { inject, injectable } from "tsyringe";

@injectable()
class DashboardUseCase {

    constructor(
        @inject("DailyPostingRepository")
        private dailyPostingRepository: IDailyPosting
    ){}

    async execute(user_id: string, isAdmin: boolean){
        if(!isAdmin){
            return await this.dailyPostingRepository.getValuesToDashboard(user_id);
        }
       return await this.dailyPostingRepository.getValuesToDashboardAdmin();
    }
}

export {
    DashboardUseCase
}