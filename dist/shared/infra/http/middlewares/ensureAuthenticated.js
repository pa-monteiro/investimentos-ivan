"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAuthenticated = ensureAuthenticated;

var _AppError = require("../../../errors/AppError");

var _express = require("express");

var _jsonwebtoken = require("jsonwebtoken");

var _UsersRepository = require("../../../../modules/account/infra/typeorm/repositories/UsersRepository");

async function ensureAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new _AppError.AppError('Token missing.');
  const [, token] = authHeader.split(" ");

  try {
    const {
      sub: user_id
    } = (0, _jsonwebtoken.verify)(token, "998c77fb9d94e2d2edd73e5431b9af88");
    const usersRepository = new _UsersRepository.UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new _AppError.AppError("User not exists");
    }

    _express.request.user = {
      id: user_id
    };
    next();
  } catch {
    throw new _AppError.AppError('Invalid token!');
  }
}