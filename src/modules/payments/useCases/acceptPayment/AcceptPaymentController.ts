import { Request, Response } from "express";
import { container } from "tsyringe";
import { AcceptPaymentUseCase } from "./AcceptPaymentUseCase";

class AcceptPaymentController {

    async handle(request: Request, response: Response):Promise<Response>{
        const { id } = request.params;
        const { id: userId } = request.user;
        const useCase = container.resolve(AcceptPaymentUseCase);
        
        return response.status(200).json(await useCase.execute(id, userId));
    }
}

export {
    AcceptPaymentController
}