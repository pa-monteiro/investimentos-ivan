"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DailyPostingRepository = void 0;

var _User = require("@modules/account/infra/typeorm/entities/User");

var _Payment = require("@modules/payments/infra/typeorm/entities/Payment");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _typeorm = require("typeorm");

var _DailyPosting = require("../entities/DailyPosting");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DailyPostingRepository {
  constructor() {
    this.repository = void 0;
    this.userRepository = void 0;
    this.paymentsRepository = void 0;
    this.repository = (0, _typeorm.getRepository)(_DailyPosting.DailyPosting);
    this.userRepository = (0, _typeorm.getRepository)(_User.User);
    this.paymentsRepository = (0, _typeorm.getRepository)(_Payment.Payment);
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

  async getValuesToIndicatorsReport() {
    var months = [undefined, 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const array = [];

    for (let i = (0, _dayjs.default)().month(); i > -1; i--) {
      const startMonth = (0, _dayjs.default)().startOf("month").month(i).toDate();
      const endMonth = (0, _dayjs.default)().endOf("month").month(i).toDate();
      const users = await this.userRepository.count({
        where: {
          created_at: (0, _typeorm.Between)(startMonth, endMonth)
        }
      });
      const {
        result
      } = await this.repository.createQueryBuilder("daily_postings").where("date BETWEEN :prev AND :next", {
        prev: startMonth,
        next: endMonth
      }).select("SUM(value) as result").getRawOne();
      const commission = parseFloat(result) * 30 / 100;
      const {
        entries
      } = await this.paymentsRepository.createQueryBuilder("payments").where("type = :type", {
        type: 'entries'
      }).andWhere("created_at BETWEEN :prev AND :next", {
        prev: startMonth,
        next: endMonth
      }).select("SUM(value) as entries").getRawOne();
      const {
        exits
      } = await this.paymentsRepository.createQueryBuilder("payments").where("payments.type = :type", {
        type: 'exits'
      }).andWhere("created_at BETWEEN :prev AND :next", {
        prev: startMonth,
        next: endMonth
      }).select("SUM(value) as exits").getRawOne();
      array.push({
        month: months[i + 1],
        resultTotal: parseFloat(result),
        entries: parseFloat(entries),
        exits: parseFloat(exits),
        commission,
        newUsers: users
      });
    }

    return array;
  }

  async create(data) {
    const daily = this.repository.create(data);
    return await this.repository.save(daily);
  }

}

exports.DailyPostingRepository = DailyPostingRepository;