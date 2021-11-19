import { Request, Response } from "express";
import { container } from "tsyringe";
import { RemoveUsersUseCase } from "./RemoveUsersUseCase";

class RemoveUsersController {

    async handle(req: Request, res: Response): Promise<Response>{
        const ids = req.body;
        const useCase = container.resolve(RemoveUsersUseCase)
         await useCase.execute(ids)

        return res.status(204).send();
    }
}

export {
    RemoveUsersController
}