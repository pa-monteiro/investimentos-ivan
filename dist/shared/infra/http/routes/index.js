"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _users = require("./users.routes");

var _authenticate = require("./authenticate.routes");

var _products = require("./products.routes");

var _daily_posting = require("./daily_posting.routes");

const router = (0, _express.Router)();
exports.router = router;
router.use("/users", _users.usersRoutes);
router.use("/sessions", _authenticate.authenticateRoutes);
router.use("/products", _products.productsRouter);
router.use("/daily-posting", _daily_posting.dailyPostingRouter);