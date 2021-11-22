"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetIndicatorsReportController = void 0;

var _tsyringe = require("tsyringe");

var _GetIndicatorsReportUseCase = require("./GetIndicatorsReportUseCase");

class GetIndicatorsReportController {
  async handle(request, response) {
    const ctn = _tsyringe.container.resolve(_GetIndicatorsReportUseCase.GetIndicatorsReportUseCase);

    const res = await ctn.execute();
    return response.status(200).json(res);
  }

}

exports.GetIndicatorsReportController = GetIndicatorsReportController;