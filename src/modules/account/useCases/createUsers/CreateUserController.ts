import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(req: Request, res: Response) : Promise<Response>{
        const {name,email,isAdmin,password} = req.body
        const ctn = container.resolve(CreateUserUseCase);
        await ctn.execute({name,email,isAdmin,password});

        return res.status(201).send();
    }

}

export {
    CreateUserController
}