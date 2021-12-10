import { container } from "tsyringe"
import { Request, Response } from 'express'
import { GetValueTotalAndValueAvailableByProductUseCase } from "./GetValueTotalAndValueAvailableByProductUseCase"

class GetValueTotalAndValueAvailableByProductController {

    async handle(request: Request, response: Response):Promise<Response>{
        const ctn = container.resolve(GetValueTotalAndValueAvailableByProductUseCase)

        const { id } = request.user;

        return response.status(200).json(await ctn.execute(id))
    }
}

export {
    GetValueTotalAndValueAvailableByProductController
}