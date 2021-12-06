import { Request, Response } from "express";
import { container } from "tsyringe";
import { WithdrawPaymentUseCase } from "./WithdrawPaymentUseCase";

class WithdrawPaymentController {

    async handle(request: Request, response: Response):Promise<Response>{
        const { id: user_id } = request.user;
        const { product_id, type, value} = request.body;
        const useCase = container.resolve(WithdrawPaymentUseCase);
        const products = await useCase.execute({
            user_id,
            product_id,
            type,
            value
        })
        return response.status(200).json(products)
    }

}

export {
    WithdrawPaymentController
}