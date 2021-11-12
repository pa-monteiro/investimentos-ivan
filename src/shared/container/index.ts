import { container } from 'tsyringe';

import "@shared/container/providers";

import { IUsersRepository } from '@modules/account/repositories/IUsersRepository'
import { UsersRepository } from '@modules/account/infra/typeorm/repositories/UsersRepository'

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductsRepository';

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IProductsRepository>(
    "ProductsRepository",
    ProductsRepository
)