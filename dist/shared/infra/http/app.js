"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _cors = _interopRequireDefault(require("cors"));

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

var _typeorm = _interopRequireDefault(require("../typeorm"));

require("../../container");

var _routes = require("./routes");

var _AppError = require("../../errors/AppError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.use(_express.default.json()); // Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.

const allowedOrigins = ['http://localhost:3000', 'https://horizont-invest.herokuapp.com'];
const options = {
  origin: allowedOrigins
};
app.use((0, _cors.default)(options));
app.use("/docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use(_routes.router);
(0, _typeorm.default)().then(() => console.log('connection with database successfull')).catch(error => console.log(error));
app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
});