import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindByIdUseCase } from "./FindByIdUseCase";

class FindByIdController {

    async handle(request: Request, response: Response):Promise<Response>{
        const { id } = request.params;
        const useCase = container.resolve(FindByIdUseCase);
        const payment = await useCase.execute(id);

        return response.status(200).json(payment);
    }


}

export {
    FindByIdController
}