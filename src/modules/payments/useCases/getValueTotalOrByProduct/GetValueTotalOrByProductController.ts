import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetValueTotalOrByProductUseCase } from "./GetValueTotalOrByProductUseCase";

class GetValueTotalOrByProductController {
    
    async handle(request: Request, response: Response):Promise<Response>{
        const {id: user_id } = request.user;
        const { product_id } = request.params;
        const ctn = container.resolve(GetValueTotalOrByProductUseCase)
        const useCase = await ctn.execute(user_id, product_id)

        return response.status(200).json(useCase)
    }
}

export {
    GetValueTotalOrByProductController
}