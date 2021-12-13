import { Request, Response } from 'express';
import { container } from 'tsyringe'
import { GetNotificationsAdminUseCase } from './GetNotificationsAdminUseCase';

class GetNotificationsAdminController {

    async handle(request: Request, response: Response):Promise<Response>{
        const ctn = container.resolve(GetNotificationsAdminUseCase);


        return response.status(200).json(await ctn.execute());
    }
}

export {
    GetNotificationsAdminController
}