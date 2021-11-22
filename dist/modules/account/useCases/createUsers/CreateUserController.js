"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _tsyringe = require("tsyringe");

var _CreateUserUseCase = require("./CreateUserUseCase");

class CreateUserController {
  async handle(req, res) {
    const {
      name,
      email,
      deadline,
      password,
      products
    } = req.body;

    const ctn = _tsyringe.container.resolve(_CreateUserUseCase.CreateUserUseCase);

    await ctn.execute({
      name,
      email,
      deadline,
      password
    }, products);
    return res.status(201).send();
  }

}

exports.CreateUserController = CreateUserController;