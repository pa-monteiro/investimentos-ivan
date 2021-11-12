import { Router } from 'express';
import multer from 'multer'
import uploadConfig from '@config/upload'
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const productsRouter = Router();

productsRouter.use(ensureAuthenticated)
productsRouter.use(ensureAdmin)

export {
    productsRouter
}