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
import { WithdrawPaymentController } from "@modules/payments/useCases/withdrawPayment/WithdrawPaymentController";
import { GetValueTotalOrByProductController } from "@modules/payments/useCases/getValueTotalOrByProduct/GetValueTotalOrByProductController";
import { GetValueTotalAndValueAvailableByProductController } from "@modules/payments/useCases/getValueTotalAndValueAvailableByProduct/GetValueTotalAndValueAvailableByProductController";

const paymentsRouter = Router();

const uploadReceipt = multer(uploadConfig)

paymentsRouter.use(ensureAuthenticated)
paymentsRouter.get('/valueTotal-and-valueAvailable-by-product', new GetValueTotalAndValueAvailableByProductController().handle);
paymentsRouter.get('/byUser', new GetPaymentsByUserController().handle);
paymentsRouter.get('/value/:product_id?', new GetValueTotalOrByProductController().handle)
paymentsRouter.post('/',new CreatePaymentController().handle);
paymentsRouter.put('/receipt/:id',uploadReceipt.single("file") ,new UpdatePaymentReceiptFileController().handle);
paymentsRouter.post('/withdraw', new WithdrawPaymentController().handle);

paymentsRouter.use(ensureAdmin)
paymentsRouter.get('/', new FindAllController().handle);
paymentsRouter.get('/:id', new FindByIdController().handle);
paymentsRouter.put('/:id/accept', new AcceptPaymentController().handle);
paymentsRouter.put('/:id/canceled', new CanceledPaymentController().handle);

export {
    paymentsRouter
}