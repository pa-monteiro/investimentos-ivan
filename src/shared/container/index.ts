import { container } from 'tsyringe';

import "@shared/container/providers";

import { IUsersRepository } from '@modules/account/repositories/IUsersRepository'
import { UsersRepository } from '@modules/account/infra/typeorm/repositories/UsersRepository'

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import { IDailyPosting } from '@modules/daily_posting/repositories/IDailyPosting';
import { DailyPostingRepository } from '@modules/daily_posting/infra/typeorm/repositories/DailyPostingRepository';
import { PaymentRepository } from '@modules/payments/infra/typeorm/repositories/PaymentRepository';
import { IPaymentRepository } from '@modules/payments/repositories/IPaymentRepository';
import { IBankAccountsRepository } from '@modules/account/repositories/IBankAccountsRepository';
import { BankAccountsRepository } from '@modules/account/infra/typeorm/repositories/BankAccountsRepository';

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IProductsRepository>(
    "ProductsRepository",
    ProductsRepository
)

container.registerSingleton<IDailyPosting>(
    "DailyPostingRepository",
    DailyPostingRepository
)

container.registerSingleton<IPaymentRepository>(
    "PaymentsRepository",
    PaymentRepository
)

container.registerSingleton<IBankAccountsRepository>(
    "BankAccountsRepository",
    BankAccountsRepository
)