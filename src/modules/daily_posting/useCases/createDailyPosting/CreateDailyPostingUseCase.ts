import { ICreateDailyPostingDTO } from "@modules/daily_posting/dtos/ICreateDailyPostingDTO";
import { DailyPosting } from "@modules/daily_posting/infra/typeorm/entities/DailyPosting";
import { IDailyPosting } from "@modules/daily_posting/repositories/IDailyPosting";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateDailyPostingUseCase {
  constructor(
    @inject("DailyPostingRepository")
    private repository: IDailyPosting
  ) {}

  async execute(data: ICreateDailyPostingDTO): Promise<DailyPosting> {
    return await this.repository.create(data);
  }
}

export { CreateDailyPostingUseCase };
