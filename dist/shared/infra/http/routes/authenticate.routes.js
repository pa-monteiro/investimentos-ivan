"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticateRoutes = void 0;

var _express = require("express");

var _AuthenticateUserController = require("@modules/account/useCases/authenticateUser/AuthenticateUserController");

const authenticateRoutes = (0, _express.Router)();
exports.authenticateRoutes = authenticateRoutes;
authenticateRoutes.post('/', new _AuthenticateUserController.AuthenticateUserController().handle);