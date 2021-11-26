import { CreatePaymentController } from "@modules/payments/useCases/createPayment/CreatePaymentController";
import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetPaymentsByUserController } from "@modules/payments/useCases/getPaymentsByUser/GetPaymentsByUserController";
import { UpdatePaymentReceiptFileController } from "@modules/payments/useCases/updatePaymentReceiptFile/UpdatePaymentReceiptFileController";
import uploadConfig from '@config/upload'
import multer from 'multer';
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { FindAllController } from "@modules/payments/useCases/findAll/FindAllController";
import { FindByIdController } from "@modules/payments/useCases/findById/FindByIdController";
import { AcceptPaymentController } from "@modules/payments/useCases/acceptPayment/AcceptPaymentController";
import { CanceledPaymentController } from "@modules/payments/useCases/canceledPayment/CanceledPaymentController";

const paymentsRouter = Router();

const uploadReceipt = multer(uploadConfig.upload("./tmp/receipts"))

paymentsRouter.use(ensureAuthenticated)
paymentsRouter.get('/byUser', new GetPaymentsByUserController().handle);
paymentsRouter.post('/',new CreatePaymentController().handle);
paymentsRouter.put('/receipt/:id',uploadReceipt.single("file") ,new UpdatePaymentReceiptFileController().handle);

paymentsRouter.use(ensureAdmin)
paymentsRouter.get('/', new FindAllController().handle);
paymentsRouter.get('/:id', new FindByIdController().handle);
paymentsRouter.put('/:id/accept', new AcceptPaymentController().handle);
paymentsRouter.put('/:id/canceled', new CanceledPaymentController().handle);

export {
    paymentsRouter
}