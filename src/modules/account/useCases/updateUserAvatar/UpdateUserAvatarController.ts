import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUserCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {

    async handle(req: Request, res: Response){
        const { id } = req.user;
        const avatar_file = req.file.filename;
        const ctn = container.resolve(UpdateUserAvatarUserCase)
        await ctn.execute({user_id: id, avatar_file});

        return res.status(204).send();
    }
}

export {
    UpdateUserAvatarController
}