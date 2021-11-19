"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindUserByIdController = void 0;

var _tsyringe = require("tsyringe");

var _FindUserByIdUseCase = require("./FindUserByIdUseCase");

class FindUserByIdController {
  async handle(request, response) {
    const {
      id
    } = request.params;

    const useCase = _tsyringe.container.resolve(_FindUserByIdUseCase.FindUserByIdUseCase);

    const user = await useCase.execute(id);
    return response.status(200).json(user);
  }

}

exports.FindUserByIdController = FindUserByIdController;