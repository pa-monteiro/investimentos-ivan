"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InMemoryProductsRepository = void 0;

var _Product = require("../../infra/typeorm/entities/Product");

class InMemoryProductsRepository {
  constructor() {
    this.products = [];
  }

  update(id, data) {
    throw new Error("Method not implemented.");
  }

  async create({
    name,
    type
  }) {
    const product = new _Product.Product();
    Object.assign(product, {
      name,
      type
    });
    this.products.push(product);
    return product;
  }

  removeIds(ids) {
    throw new Error("Method not implemented.");
  }

  async findById(id) {
    return this.products.find(p => p.id === id);
  }

  async findByIds(ids) {
    return this.products.filter(p => ids.includes(p.id));
  }

  async listAll() {
    return this.products;
  }

}

exports.InMemoryProductsRepository = InMemoryProductsRepository;