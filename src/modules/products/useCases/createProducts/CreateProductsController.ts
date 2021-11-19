import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateProductsUseCase } from "./CreateProductsUseCase"

class CreateProductsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const ctn = container.resolve(CreateProductsUseCase);
        const response = await ctn.execute(req.body);

        return res.status(201).json(response)
    }

}

export {
    CreateProductsController
}