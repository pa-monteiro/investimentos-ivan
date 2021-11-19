"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyPostingRepository = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _typeorm = require("typeorm");

var _DailyPosting = require("../entities/DailyPosting");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DailyPostingRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_DailyPosting.DailyPosting);
  }

  async getValuesToDashboardAdmin() {
    const startMonth = (0, _dayjs.default)().startOf("month").toDate();
    const endMonth = (0, _dayjs.default)().endOf("month").toDate();
    const valueTotalFund = await this.repository.find({
      where: {
        date: (0, _typeorm.Between)(startMonth, endMonth)
      }
    });
    const valueTotal = valueTotalFund.reduce((acc, value) => acc += Number(parseFloat(value.value).toFixed(2)), 0);
    return {
      valueTotal
    };
  }

  async create(data) {
    const daily = this.repository.create(data);
    return await this.repository.save(daily);
  }

}

exports.DailyPostingRepository = DailyPostingRepository;