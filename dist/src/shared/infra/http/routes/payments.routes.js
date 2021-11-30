"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRouter = void 0;
var CreatePaymentController_1 = require("@modules/payments/useCases/createPayment/CreatePaymentController");
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@config/upload"));
var ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
var GetPaymentsByUserController_1 = require("@modules/payments/useCases/getPaymentsByUser/GetPaymentsByUserController");
var paymentsRouter = (0, express_1.Router)();
exports.paymentsRouter = paymentsRouter;
var uploadReceipt = (0, multer_1.default)(upload_1.default.upload("./tmp/receipt"));
paymentsRouter.use(ensureAuthenticated_1.ensureAuthenticated);
paymentsRouter.get('/byUser', new GetPaymentsByUserController_1.GetPaymentsByUserController().handle);
paymentsRouter.post('/', uploadReceipt.single('receipt_image'), new CreatePaymentController_1.CreatePaymentController().handle);
