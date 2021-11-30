import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindAllUseCase } from "./FindAllUseCase";

class FindAllController {

    async handle(request: Request, response: Response):Promise<Response>{
        const useCase = container.resolve(FindAllUseCase);
        const list = await useCase.execute();
        return response.status(200).json(list);
    }
}

export {
    FindAllController
}