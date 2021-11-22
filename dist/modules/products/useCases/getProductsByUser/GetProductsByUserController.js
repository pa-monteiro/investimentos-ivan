"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetProductsByUserController = void 0;

var _tsyringe = require("tsyringe");

var _GetProductsByUserUseCase = require("./GetProductsByUserUseCase");

class GetProductsByUserController {
  async handle(request, response) {
    const {
      id
    } = request.user;

    const useCase = _tsyringe.container.resolve(_GetProductsByUserUseCase.GetProductsByUserUseCase);

    const products = await useCase.execute(id);
    return response.status(200).json(products);
  }

}

exports.GetProductsByUserController = GetProductsByUserController;