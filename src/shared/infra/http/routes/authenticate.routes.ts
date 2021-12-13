import { Router } from 'express'
import { AuthenticateUserController } from '@modules/account/useCases/authenticateUser/AuthenticateUserController';
import { RefreshTokenController } from '@modules/account/useCases/refreshToken/RefreshTokenController';

const authenticateRoutes = Router();

authenticateRoutes.post('/', new AuthenticateUserController().handle)
authenticateRoutes.post('/refresh-token', new RefreshTokenController().handle)

export { authenticateRoutes };