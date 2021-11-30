"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePaymentController = void 0;

var _tsyringe = require("tsyringe");

var _CreatePaymentUseCase = require("./CreatePaymentUseCase");

class CreatePaymentController {
  async handle(request, response) {
    const body = request.body;
    const {
      id
    } = request.user;
    const data = Object.assign(body, {
      user_id: id
    });

    const useCase = _tsyringe.container.resolve(_CreatePaymentUseCase.CreatePaymentUseCase);

    const res = await useCase.execute(data);
    return response.status(201).json(res);
  }

}

exports.CreatePaymentController = CreatePaymentController;