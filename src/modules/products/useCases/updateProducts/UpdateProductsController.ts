import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProductsUseCase } from "./UpdateProductsUseCase";

class UpdateProductsController {

    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const data: ICreateProductDTO = request.body
        const useCase = container.resolve(UpdateProductsUseCase);
        await useCase.execute(id, data);

        return response.status(200).send();
    }
}

export {
    UpdateProductsController
}