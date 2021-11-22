"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;

var _UsersRepository = require("../../../../modules/account/infra/typeorm/repositories/UsersRepository");

var _AppError = require("../../../errors/AppError");

async function ensureAdmin(request, response, next) {
  try {
    const {
      id
    } = request.user;
    const usersRepository = new _UsersRepository.UsersRepository();
    const user = await usersRepository.findById(id);

    if (!user.isAdmin) {
      throw new _AppError.AppError("User isn't admin.");
    }

    next();
  } catch (error) {
    throw new _AppError.AppError(error);
  }
}