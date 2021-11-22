"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FindProductByIdUseCase = void 0;

var _IProductsRepository = require("@modules/products/repositories/IProductsRepository");

var _tsyringe = require("tsyringe");

var _dec, _dec2, _dec3, _dec4, _class;

let FindProductByIdUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("ProductsRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.IProductsRepository === "undefined" ? Object : _IProductsRepository.IProductsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class FindProductByIdUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(id) {
    return await this.repository.findById(id);
  }

}) || _class) || _class) || _class) || _class);
exports.FindProductByIdUseCase = FindProductByIdUseCase;