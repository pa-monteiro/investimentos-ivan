import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUsersUseCase } from "./ListUsersUseCase";

class ListUsersController {

    async handle(req: Request, res: Response): Promise<Response> {
        const useCase = container.resolve(ListUsersUseCase);
        const exc = await useCase.execute();

        return res.status(200).json(exc);
    }
}

export {
    ListUsersController
}