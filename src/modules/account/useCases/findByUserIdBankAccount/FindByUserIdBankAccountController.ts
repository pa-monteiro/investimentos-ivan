import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByUserIdBankAccountUseCase } from "./FindByUserIdBankAccountUseCase";

class FindByUserIdBankAccountController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const ctn = container.resolve(FindByUserIdBankAccountUseCase);

        const useCase = await ctn.execute(id);

        return response.status(200).json(useCase);
    }

}

export {
    FindByUserIdBankAccountController
}