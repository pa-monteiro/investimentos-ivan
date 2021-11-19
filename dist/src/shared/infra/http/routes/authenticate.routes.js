"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateRoutes = void 0;
var express_1 = require("express");
var AuthenticateUserController_1 = require("@modules/account/useCases/authenticateUser/AuthenticateUserController");
var authenticateRoutes = (0, express_1.Router)();
exports.authenticateRoutes = authenticateRoutes;
authenticateRoutes.post('/', new AuthenticateUserController_1.AuthenticateUserController().handle);
