"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentRepository = void 0;

var _Product = require("../../../../products/infra/typeorm/entities/Product");

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

var _timezone = _interopRequireDefault(require("dayjs/plugin/timezone"));

require("dayjs/locale/pt-br");

var _typeorm = require("typeorm");

var _Payment = require("../entities/Payment");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

_dayjs.default.locale('pt-br');

_dayjs.default.extend(_timezone.default);

_dayjs.default.tz.setDefault("America/Sao_Paulo");

class PaymentRepository {
  constructor() {
    this.repository = void 0;
    this.productsRepository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Payment.Payment);
    this.productsRepository = (0, _typeorm.getRepository)(_Product.Product);
  }

  async findAll() {
    return await this.repository.createQueryBuilder("payments").select(['payments.id', 'payments.type', 'payments.value', 'payments.created_at', 'payments.release_date', 'payments.start_date', 'payments.status', 'product.id', 'product.name', 'user.id', 'user.name']).leftJoin('payments.product', 'product').leftJoin('payments.user', 'user').getMany();
  }

  async findById(id) {
    const payment = await this.repository.findOne(id, {
      relations: ['user', 'userAcceptedBy', 'product']
    });

    if (payment.start_date) {
      payment.release_date = (0, _dayjs.default)(payment.release_date).format('DD/MM/YYYY');
      payment.start_date = (0, _dayjs.default)(payment.start_date).format('DD/MM/YYYY');
    }

    return payment;
  }

  async findByUserId(id) {
    const allValues = await this.repository.createQueryBuilder("payments").select(['payments.id', 'payments.type', 'payments.value', 'payments.created_at', 'payments.release_date', 'payments.start_date', 'payments.status', 'product.id', 'product.name']).where({
      user_id: id
    }).leftJoin('payments.product', 'product').getMany();
    return allValues;
  }

  async create(data) {
    const payment = this.repository.create(data);
    return await this.repository.save(payment);
  }

  async accept(id, user_id) {
    const payment = await this.repository.findOne(id, {
      relations: ['product']
    });
    payment.start_date = new Date((0, _dayjs.default)().add(payment.product.deadline_contribution, 'day').tz('America/Sao_Paulo').format('YYYY-MM-DD'));
    payment.release_date = new Date((0, _dayjs.default)().add(payment.product.withdrawal_deadline, 'day').tz('America/Sao_Paulo').format('YYYY-MM-DD'));
    payment.accepted_at = (0, _dayjs.default)().tz('America/Sao_Paulo').format();
    payment.accepted_by = user_id;
    payment.status = _Payment.PaymentStatusEnum.ACCEPTED;
    await this.repository.save(payment);
    return payment;
  }

  async canceled(id, user_id) {
    const payment = await this.repository.findOne(id);
    payment.accepted_at = (0, _dayjs.default)().tz('America/Sao_Paulo').format();
    payment.accepted_by = user_id;
    payment.status = _Payment.PaymentStatusEnum.CANCELED;
    await this.repository.save(payment);
    return payment;
  } // tipos de aceite
  // liberado - cron que gira toda meia noite procurando a coluna release_date se bater com o dia, mudar o status para free
  // solicitar retirada - verifica se estiver livre, se sim verifica o valor, se sim, muda o status para pending and type exits, se aceitar, remove o valor do fundo


}

exports.PaymentRepository = PaymentRepository;