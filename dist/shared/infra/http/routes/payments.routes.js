"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentsRouter = void 0;

var _CreatePaymentController = require("../../../../modules/payments/useCases/createPayment/CreatePaymentController");

var _express = require("express");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _GetPaymentsByUserController = require("../../../../modules/payments/useCases/getPaymentsByUser/GetPaymentsByUserController");

var _UpdatePaymentReceiptFileController = require("../../../../modules/payments/useCases/updatePaymentReceiptFile/UpdatePaymentReceiptFileController");

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _multer = _interopRequireDefault(require("multer"));

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _FindAllController = require("../../../../modules/payments/useCases/findAll/FindAllController");

var _FindByIdController = require("../../../../modules/payments/useCases/findById/FindByIdController");

var _AcceptPaymentController = require("../../../../modules/payments/useCases/acceptPayment/AcceptPaymentController");

var _CanceledPaymentController = require("../../../../modules/payments/useCases/canceledPayment/CanceledPaymentController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const paymentsRouter = (0, _express.Router)();
exports.paymentsRouter = paymentsRouter;
const uploadReceipt = (0, _multer.default)(_upload.default.upload("./tmp/receipts"));
paymentsRouter.use(_ensureAuthenticated.ensureAuthenticated);
paymentsRouter.get('/byUser', new _GetPaymentsByUserController.GetPaymentsByUserController().handle);
paymentsRouter.post('/', new _CreatePaymentController.CreatePaymentController().handle);
paymentsRouter.put('/receipt/:id', uploadReceipt.single("file"), new _UpdatePaymentReceiptFileController.UpdatePaymentReceiptFileController().handle);
paymentsRouter.use(_ensureAdmin.ensureAdmin);
paymentsRouter.get('/', new _FindAllController.FindAllController().handle);
paymentsRouter.get('/:id', new _FindByIdController.FindByIdController().handle);
paymentsRouter.put('/:id/accept', new _AcceptPaymentController.AcceptPaymentController().handle);
paymentsRouter.put('/:id/canceled', new _CanceledPaymentController.CanceledPaymentController().handle);