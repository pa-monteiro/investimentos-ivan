"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var cors_1 = __importDefault(require("cors"));
var swagger_json_1 = __importDefault(require("../../../swagger.json"));
var typeorm_1 = __importDefault(require("@shared/infra/typeorm"));
require("@shared/container");
var routes_1 = require("@shared/infra/http/routes");
var AppError_1 = require("@shared/errors/AppError");
var app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
var allowedOrigins = ['http://localhost:3000', 'https://horizont-invest.herokuapp.com'];
var options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use(routes_1.router);
(0, typeorm_1.default)().then(function () { return console.log('connection with database successfull'); }).catch(function (error) { return console.log(error); });
app.use(function (err, request, response, next) {
    if (err instanceof AppError_1.AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: "Internal server error - " + err.message
    });
});
