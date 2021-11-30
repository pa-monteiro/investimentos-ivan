"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserUseCase = require("./UpdateUserUseCase");

class UpdateUserController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const data = request.body;
    const {
      products
    } = request.body;

    const useCase = _tsyringe.container.resolve(_UpdateUserUseCase.UpdateUserUseCase);

    await useCase.execute(id, data, products);
    return response.status(204).send();
  }

}

exports.UpdateUserController = UpdateUserController;