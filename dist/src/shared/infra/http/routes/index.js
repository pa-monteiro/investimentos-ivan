"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var users_routes_1 = require("./users.routes");
var authenticate_routes_1 = require("./authenticate.routes");
var products_routes_1 = require("./products.routes");
var daily_posting_routes_1 = require("./daily_posting.routes");
var payments_routes_1 = require("./payments.routes");
var router = (0, express_1.Router)();
exports.router = router;
router.use("/users", users_routes_1.usersRoutes);
router.use("/sessions", authenticate_routes_1.authenticateRoutes);
router.use("/products", products_routes_1.productsRouter);
router.use("/daily-posting", daily_posting_routes_1.dailyPostingRouter);
router.use('/payments', payments_routes_1.paymentsRouter);