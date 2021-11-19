import { CreatePaymentController } from "@modules/payments/useCases/createPayment/CreatePaymentController";
import { Router } from "express";
import multer from "multer";
import uploadConfig from '@config/upload'
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { GetPaymentsByUserController } from "@modules/payments/useCases/getPaymentsByUser/GetPaymentsByUserController";

const paymentsRouter = Router();

const uploadReceipt = multer(uploadConfig.upload("./tmp/receipt"))

paymentsRouter.use(ensureAuthenticated)
paymentsRouter.get('/byUser', new GetPaymentsByUserController().handle);
paymentsRouter.post('/', uploadReceipt.single('receipt_image') ,new CreatePaymentController().handle);

export {
    paymentsRouter
}