import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePaymentUseCase } from "./CreatePaymentUseCase";

class CreatePaymentController {

    async handle(request: Request, response: Response): Promise<Response>{
        const body = request.body;
        const { id } = request.user;
        const data = Object.assign(body,{
            user_id: id
        });
        
        const useCase = container.resolve(CreatePaymentUseCase);
        const res = await useCase.execute(data);

        return response.status(201).json(res);
    }
}

export {
    CreatePaymentController
}