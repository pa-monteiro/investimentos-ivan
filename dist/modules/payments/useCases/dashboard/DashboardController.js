"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardController = void 0;

var _tsyringe = require("tsyringe");

var _DashboardUseCase = require("./DashboardUseCase");

class DashboardController {
  async handle(request, response) {
    const ctn = _tsyringe.container.resolve(_DashboardUseCase.DashboardUseCase);

    const result = await ctn.execute();
    return response.status(200).json(result);
  }

}

exports.DashboardController = DashboardController;