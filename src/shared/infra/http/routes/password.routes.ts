import { SendForgotPasswordMailController } from '@modules/account/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

passwordRoutes.post('/forgot', new SendForgotPasswordMailController().handle);

export {
    passwordRoutes
}