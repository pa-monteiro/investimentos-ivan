import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByUserIdBankAccountAdminUseCase } from "./FindByUserIdBankAccountAdminUseCase";

class FindByUserIdBankAccountAdminController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const ctn = container.resolve(FindByUserIdBankAccountAdminUseCase);

        const useCase = await ctn.execute(id);

        return response.status(200).json(useCase);
    }

}

export {
    FindByUserIdBankAccountAdminController
}