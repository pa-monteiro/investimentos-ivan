import { ResetPasswordUserController } from '@modules/account/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/account/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';
import { Router } from 'express';

const passwordRoutes = Router();

passwordRoutes.post('/reset', new ResetPasswordUserController().handle);
passwordRoutes.post('/forgot', new SendForgotPasswordMailController().handle);

export {
    passwordRoutes
}