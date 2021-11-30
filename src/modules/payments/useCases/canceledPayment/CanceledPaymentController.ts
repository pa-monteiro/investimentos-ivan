import { Request, Response } from "express";
import { container } from "tsyringe";
import { CanceledPaymentUseCase } from "./CanceledPaymentUseCase";

class CanceledPaymentController {

    async handle(request: Request, response: Response):Promise<Response>{
        const { id } = request.params;
        const { id: user_id } = request.user;
        const useCase = container.resolve(CanceledPaymentUseCase);
        const payment = await useCase.execute(id, user_id)

        return response.status(204).json(payment)
    }
}

export {
    CanceledPaymentController
}