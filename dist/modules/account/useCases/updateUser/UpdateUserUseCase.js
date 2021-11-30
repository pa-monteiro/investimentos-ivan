"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserUseCase = void 0;

var _IUsersRepository = require("../../repositories/IUsersRepository");

var _IProductsRepository = require("../../../products/repositories/IProductsRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UpdateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("ProductsRepository")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IProductsRepository.IProductsRepository === "undefined" ? Object : _IProductsRepository.IProductsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserUseCase {
  constructor(repository, productsRepository) {
    this.repository = repository;
    this.productsRepository = productsRepository;
  }

  async execute(id, data, products) {
    const user = await this.repository.updateById(id, data);

    if (products) {
      const product = await this.productsRepository.findByIds(products);
      user.products = product;
      await this.repository.create(user);
    }
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUserUseCase = UpdateUserUseCase;