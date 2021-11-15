import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

class FindUserByIdController {

    async handle(request: Request, response: Response): Promise<Response>{
        const { id } = request.params;
        const useCase = container.resolve(FindUserByIdUseCase);

        const user = await useCase.execute(id);

        return response.status(200).json(user);
    }
}

export {
    FindUserByIdController
}