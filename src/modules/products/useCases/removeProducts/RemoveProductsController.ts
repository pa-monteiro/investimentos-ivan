import { Request, Response } from 'express'
import { container } from 'tsyringe';
import { RemoveProductsUseCase } from './RemoveProductsUseCase';

class RemoveProductsController {
        async handle(req: Request, res: Response): Promise<Response>{
            const ids = req.body;
            const ctn = container.resolve(RemoveProductsUseCase);
            await ctn.execute(ids)

            return res.status(204).send();
        }

}

export {
    RemoveProductsController
}