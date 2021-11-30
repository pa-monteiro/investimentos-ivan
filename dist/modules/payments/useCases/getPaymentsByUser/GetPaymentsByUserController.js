"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPaymentsByUserController = void 0;

var _tsyringe = require("tsyringe");

var _GetPaymentsByUserUseCase = require("./GetPaymentsByUserUseCase");

class GetPaymentsByUserController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const useCase = _tsyringe.container.resolve(_GetPaymentsByUserUseCase.GetPaymentsByUserUseCase);

    const res = await useCase.execute(id);
    return response.status(200).json(res);
  }

}

exports.GetPaymentsByUserController = GetPaymentsByUserController;