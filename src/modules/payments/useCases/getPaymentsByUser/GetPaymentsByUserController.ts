import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPaymentsByUserUseCase } from "./GetPaymentsByUserUseCase";

class GetPaymentsByUserController {

    async handle(request: Request, response: Response):Promise<Response>{
        const { id } = request.user;
        const useCase = container.resolve(GetPaymentsByUserUseCase);
        const res = await useCase.execute(id);

        return response.status(200).json(res);
    }
}

export {
    GetPaymentsByUserController
}