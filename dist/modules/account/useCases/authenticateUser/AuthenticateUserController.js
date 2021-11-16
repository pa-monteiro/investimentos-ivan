"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserController = void 0;

var _tsyringe = require("tsyringe");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

class AuthenticateUserController {
  async handle(req, res) {
    const {
      email,
      password
    } = req.body;

    const ctn = _tsyringe.container.resolve(_AuthenticateUserUseCase.AuthenticateUserUseCase);

    const infos = await ctn.execute({
      email,
      password
    });
    return res.status(200).json(infos);
  }

}

exports.AuthenticateUserController = AuthenticateUserController;