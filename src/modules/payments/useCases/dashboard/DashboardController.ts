import { Request, Response } from "express";
import { container } from "tsyringe";
import { DashboardUseCase } from "./DashboardUseCase";

class DashboardController {

    async handle(request: Request, response: Response): Promise<Response>{
        const ctn = container.resolve(DashboardUseCase)
        const { id, isAdmin } = request.user
        const result = await ctn.execute(
            id,
            isAdmin
        );

        return response.status(200).json(result);
    }
}

export {
    DashboardController
}