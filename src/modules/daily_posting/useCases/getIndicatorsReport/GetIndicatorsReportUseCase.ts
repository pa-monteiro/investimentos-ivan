import { IDailyPosting } from "@modules/daily_posting/repositories/IDailyPosting"
import { inject, injectable } from "tsyringe";

@injectable()
class GetIndicatorsReportUseCase {

    constructor(
        @inject("DailyPostingRepository")
        private repository: IDailyPosting
    ){}

    async execute(){
        return await this.repository.getValuesToIndicatorsReport();
    }
}

export {
    GetIndicatorsReportUseCase
}