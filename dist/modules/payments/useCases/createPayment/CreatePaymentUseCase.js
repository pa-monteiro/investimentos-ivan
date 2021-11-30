"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePaymentUseCase = void 0;

var _Payment = require("../../infra/typeorm/entities/Payment");

var _IPaymentRepository = require("../../repositories/IPaymentRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let CreatePaymentUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("PaymentsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IPaymentRepository.IPaymentRepository === "undefined" ? Object : _IPaymentRepository.IPaymentRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreatePaymentUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(data) {
    data.status = _Payment.PaymentStatusEnum.PENDING;
    return await this.repository.create(data);
  }

}) || _class) || _class) || _class) || _class);
exports.CreatePaymentUseCase = CreatePaymentUseCase;