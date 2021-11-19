import { Request, Response } from "express";
import { container } from "tsyringe";
import { FindProductByIdUseCase } from "./FindProductByIdUseCase";

class FindProductByIdController {

    async handle(request: Request, response: Response):Promise<Response>{
        const { id } = request.params;
        const ctn = container.resolve(FindProductByIdUseCase);

        const res = await ctn.execute(id);

        return response.status(200).json(res);
    }

}

export {
    FindProductByIdController
}