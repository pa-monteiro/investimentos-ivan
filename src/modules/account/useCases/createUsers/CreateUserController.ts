import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    async handle(req: Request, res: Response) : Promise<Response>{
        const {
            name,
            email,
            password,
            phone,
            cpf,
            cep,
            address,
            number,
            complement,
            neighborhood,
            products
        } = req.body
        const ctn = container.resolve(CreateUserUseCase);
        await ctn.execute({ name,
            email,
            password,
            phone,
            cpf,
            cep,
            address,
            number,
            complement,
            neighborhood},products);

        return res.status(201).send();
    }

}

export {
    CreateUserController
}