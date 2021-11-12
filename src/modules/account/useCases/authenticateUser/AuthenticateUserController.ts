import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(req: Request, res: Response): Promise<Response>{
        const { email, password } = req.body;
        const ctn = container.resolve(AuthenticateUserUseCase);
        const infos = await ctn.execute({email, password});
        return res.status(200).json(infos)
    }
}

export {
    AuthenticateUserController
}