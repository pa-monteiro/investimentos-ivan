import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateBankAccountUseCase } from "./CreateBankAccountUseCase";

class CreateBankAccountController {

    async handle(request: Request, response: Response): Promise<Response>{
        const data = request.body;
        const { id } = request.user;
        data.user_id = id;
        
        const useCase = container.resolve(CreateBankAccountUseCase);
        await useCase.execute(data)

        return response.status(201).send();
    }

}

export {
    CreateBankAccountController
}