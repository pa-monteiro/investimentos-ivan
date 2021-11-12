import { Router } from 'express'
import { AuthenticateUserController } from '@modules/account/useCases/authenticateUser/AuthenticateUserController';

const authenticateRoutes = Router();

authenticateRoutes.post('/', new AuthenticateUserController().handle)

export { authenticateRoutes };