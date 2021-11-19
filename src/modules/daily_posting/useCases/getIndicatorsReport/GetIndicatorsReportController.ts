import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetIndicatorsReportUseCase } from "./GetIndicatorsReportUseCase";

class GetIndicatorsReportController {

    async handle(request: Request, response: Response): Promise<Response>{
        const ctn = container.resolve(GetIndicatorsReportUseCase);

        const res = await ctn.execute();
        return response.status(200).json(res);
    }
}

export {
    GetIndicatorsReportController
}