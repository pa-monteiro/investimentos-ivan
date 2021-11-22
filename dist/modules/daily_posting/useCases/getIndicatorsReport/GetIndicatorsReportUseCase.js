"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetIndicatorsReportUseCase = void 0;

var _IDailyPosting = require("../../repositories/IDailyPosting");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let GetIndicatorsReportUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("DailyPostingRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IDailyPosting.IDailyPosting === "undefined" ? Object : _IDailyPosting.IDailyPosting]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class GetIndicatorsReportUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    return await this.repository.getValuesToIndicatorsReport();
  }

}) || _class) || _class) || _class) || _class);
exports.GetIndicatorsReportUseCase = GetIndicatorsReportUseCase;