"use strict";

var _tsyringe = require("tsyringe");

require("@shared/container/providers");

var _UsersRepository = require("@modules/account/infra/typeorm/repositories/UsersRepository");

var _ProductsRepository = require("@modules/products/infra/typeorm/repositories/ProductsRepository");

var _DailyPostingRepository = require("@modules/daily_posting/infra/typeorm/repositories/DailyPostingRepository");

var _PaymentRepository = require("@modules/payments/infra/typeorm/repositories/PaymentRepository");

_tsyringe.container.registerSingleton("UsersRepository", _UsersRepository.UsersRepository);

_tsyringe.container.registerSingleton("ProductsRepository", _ProductsRepository.ProductsRepository);

_tsyringe.container.registerSingleton("DailyPostingRepository", _DailyPostingRepository.DailyPostingRepository);

_tsyringe.container.registerSingleton("PaymentsRepository", _PaymentRepository.PaymentRepository);