import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateDailyPostingUseCase } from "./UpdateDailyPostingUseCase";

interface IRequest {
    id: string;
    date: Date;
    value: string;
    user_id: string; 
}

class UpdateDailyPostingController {

    async handle(req: Request, res: Response): Promise<Response>{
        let data: IRequest = req.body;
        const { id } = req.params;
        data.id = id;
        data.user_id = req.user.id; 
        const ctn = container.resolve(UpdateDailyPostingUseCase);
        const response = await ctn.execute(data);

        return res.status(200).json(response);
    }
}

export {
    UpdateDailyPostingController
}