import { Router } from 'express';
import multer from "multer";

import { UpdateUserAvatarController } from '@modules/account/useCases/updateUserAvatar/UpdateUserAvatarController';
import { CreateUserController } from '@modules/account/useCases/createUsers/CreateUserController';
import { ListUsersController } from '@modules/account/useCases/listUsers/ListUsersController';
import { RemoveUsersController } from '@modules/account/useCases/removeUsers/RemoveUsersController';

import uploadConfig from '@config/upload'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { FindUserByIdController } from '@modules/account/useCases/findUserById/FindUserByIdController';
import { UpdateUserController } from '@modules/account/useCases/updateUser/UpdateUserController';
import { CreateBankAccountController } from '@modules/account/useCases/createBankAccount/CreateBankAccountController';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig)

usersRoutes.post('/', new CreateUserController().handle);
usersRoutes.use(ensureAuthenticated)
usersRoutes.patch('/avatar',uploadAvatar.single("avatar") ,new UpdateUserAvatarController().handle)
usersRoutes.use(ensureAdmin)
usersRoutes.post('/bank-account', new CreateBankAccountController().handle);
usersRoutes.get('/', new ListUsersController().handle);
usersRoutes.get('/:id', new FindUserByIdController().handle);
usersRoutes.put('/:id/update', new UpdateUserController().handle);
usersRoutes.post('/remove', new RemoveUsersController().handle);



export { usersRoutes }