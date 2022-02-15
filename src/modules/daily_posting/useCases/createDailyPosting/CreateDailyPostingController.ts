import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateDailyPostingUseCase } from "./CreateDailyPostingUseCase";

interface IRequest {
  date: Date;
  value: string;
  user_id: string;
}

class CreateDailyPostingController {
  async handle(req: Request, res: Response): Promise<Response> {
    const data: IRequest = req.body;
    data.user_id = req.user.id;
    const ctn = container.resolve(CreateDailyPostingUseCase);
    const response = await ctn.execute(data);

    return res.status(201).json(response);
  }
}

export { CreateDailyPostingController };
