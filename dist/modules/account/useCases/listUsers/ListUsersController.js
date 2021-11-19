"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersController = void 0;

var _tsyringe = require("tsyringe");

var _ListUsersUseCase = require("./ListUsersUseCase");

class ListUsersController {
  async handle(req, res) {
    const useCase = _tsyringe.container.resolve(_ListUsersUseCase.ListUsersUseCase);

    const exc = await useCase.execute();
    return res.status(200).json(exc);
  }

}

exports.ListUsersController = ListUsersController;