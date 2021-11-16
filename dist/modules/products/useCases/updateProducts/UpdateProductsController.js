"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateProductsController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateProductsUseCase = require("./UpdateProductsUseCase");

class UpdateProductsController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const data = request.body;

    const useCase = _tsyringe.container.resolve(_UpdateProductsUseCase.UpdateProductsUseCase);

    await useCase.execute(id, data);
    return response.status(200).send();
  }

}

exports.UpdateProductsController = UpdateProductsController;