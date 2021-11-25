import { IUpdateUserDTO } from "@modules/account/dtos/IUpdateUserDTO";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {

    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const data: IUpdateUserDTO = request.body
        const { products } = request.body;
        const useCase = container.resolve(UpdateUserUseCase);
        await useCase.execute(id, data, products);

        return response.status(204).send();
    }
}

export {
    UpdateUserController
}