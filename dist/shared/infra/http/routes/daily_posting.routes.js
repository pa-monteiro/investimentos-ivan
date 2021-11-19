"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dailyPostingRouter = void 0;

var _CreateDailyPostingController = require("../../../../modules/daily_posting/useCases/createDailyPosting/CreateDailyPostingController");

var _DashboardController = require("../../../../modules/payments/useCases/dashboard/DashboardController");

var _express = require("express");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const dailyPostingRouter = (0, _express.Router)();
exports.dailyPostingRouter = dailyPostingRouter;
dailyPostingRouter.use(_ensureAuthenticated.ensureAuthenticated);
dailyPostingRouter.use(_ensureAdmin.ensureAdmin);
dailyPostingRouter.post('/', new _CreateDailyPostingController.CreateDailyPostingController().handle);
dailyPostingRouter.get('/dashboard', new _DashboardController.DashboardController().handle);