"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListUsersUseCase = void 0;

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let ListUsersUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListUsersUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    const users = await this.repository.listAll();
    return users;
  }

}) || _class) || _class) || _class) || _class);
exports.ListUsersUseCase = ListUsersUseCase;