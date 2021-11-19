import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetProductsByUserUseCase } from "./GetProductsByUserUseCase";


class GetProductsByUserController {

    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.user;
        const useCase = container.resolve(GetProductsByUserUseCase);
        const products = await useCase.execute(id)
        return response.status(200).json(products);
    }

}

export {
    GetProductsByUserController
}