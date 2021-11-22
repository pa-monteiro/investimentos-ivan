"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentsRouter = void 0;

var _CreatePaymentController = require("@modules/payments/useCases/createPayment/CreatePaymentController");

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("@config/upload"));

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

var _GetPaymentsByUserController = require("@modules/payments/useCases/getPaymentsByUser/GetPaymentsByUserController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const paymentsRouter = (0, _express.Router)();
exports.paymentsRouter = paymentsRouter;
const uploadReceipt = (0, _multer.default)(_upload.default.upload("./tmp/receipt"));
paymentsRouter.use(_ensureAuthenticated.ensureAuthenticated);
paymentsRouter.get('/byUser', new _GetPaymentsByUserController.GetPaymentsByUserController().handle);
paymentsRouter.post('/', uploadReceipt.single('receipt_image'), new _CreatePaymentController.CreatePaymentController().handle);