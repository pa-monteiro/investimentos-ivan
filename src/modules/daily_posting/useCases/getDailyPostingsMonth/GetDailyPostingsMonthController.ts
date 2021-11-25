import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetDailyPostingsMonthUseCase } from "./GetDailyPostingsMonthUseCase";

class GetDailyPostingsMonthController {

    async handle(request: Request, response: Response):Promise<Response>{
        const useCase = container.resolve(GetDailyPostingsMonthUseCase);
        const list = await useCase.execute();

        return response.status(200).json(list);
    }
}

export {
    GetDailyPostingsMonthController
}