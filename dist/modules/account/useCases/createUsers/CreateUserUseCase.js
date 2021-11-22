"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _IUsersRepository = require("@modules/account/repositories/IUsersRepository");

var _bcrypt = require("bcrypt");

var _tsyringe = require("tsyringe");

var _AppError = require("@shared/errors/AppError");

var _IProductsRepository = require("@modules/products/repositories/IProductsRepository");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ProductsRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IProductsRepository.IProductsRepository === "undefined" ? Object : _IProductsRepository.IProductsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateUserUseCase {
  constructor(usersRepository, productsRepository) {
    this.usersRepository = usersRepository;
    this.productsRepository = productsRepository;
  }

  async execute({
    name,
    email,
    deadline,
    password
  }, products) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new _AppError.AppError('Usuário já está cadastrado.');
    }

    const passwordHash = await (0, _bcrypt.hash)(password, 8);
    const user = await this.usersRepository.create({
      name,
      email,
      deadline,
      password: passwordHash
    });

    if (products) {
      const product = await this.productsRepository.findByIds(products);
      user.products = product;
      const userUpdated = await this.usersRepository.create(user);
      return userUpdated;
    }

    return user;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.CreateUserUseCase = CreateUserUseCase;