import { IDailyPosting } from "@modules/daily_posting/repositories/IDailyPosting";
import { inject, injectable } from "tsyringe";

@injectable()
class DashboardUseCase {

    constructor(
        @inject("DailyPostingRepository")
        private dailyPostingRepository: IDailyPosting
    ){}

    async execute(){
       return await this.dailyPostingRepository.getValuesToDashboardAdmin();
    }
}

export {
    DashboardUseCase
}