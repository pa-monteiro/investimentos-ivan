import { Router } from 'express';
import multer from "multer";

import { UpdateUserAvatarController } from '@modules/account/useCases/updateUserAvatar/UpdateUserAvatarController';
import { CreateUserController } from '@modules/account/useCases/createUsers/CreateUserController';

import uploadConfig from '@config/upload'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))
usersRoutes.post('/', new CreateUserController().handle);

usersRoutes.patch('/avatar', ensureAuthenticated,uploadAvatar.single("avatar") ,new UpdateUserAvatarController().handle)


export { usersRoutes }