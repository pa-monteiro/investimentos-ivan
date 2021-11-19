"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RemoveUsersController = void 0;

var _tsyringe = require("tsyringe");

var _RemoveUsersUseCase = require("./RemoveUsersUseCase");

class RemoveUsersController {
  async handle(req, res) {
    const ids = req.body;

    const useCase = _tsyringe.container.resolve(_RemoveUsersUseCase.RemoveUsersUseCase);

    await useCase.execute(ids);
    return res.status(204).send();
  }

}

exports.RemoveUsersController = RemoveUsersController;