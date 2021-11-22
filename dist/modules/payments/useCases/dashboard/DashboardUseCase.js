"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DashboardUseCase = void 0;

var _IDailyPosting = require("@modules/daily_posting/repositories/IDailyPosting");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let DashboardUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("DailyPostingRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IDailyPosting.IDailyPosting === "undefined" ? Object : _IDailyPosting.IDailyPosting]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DashboardUseCase {
  constructor(dailyPostingRepository) {
    this.dailyPostingRepository = dailyPostingRepository;
  }

  async execute() {
    return await this.dailyPostingRepository.getValuesToDashboardAdmin();
  }

}) || _class) || _class) || _class) || _class);
exports.DashboardUseCase = DashboardUseCase;