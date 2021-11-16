"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductsRepository = void 0;

var _typeorm = require("typeorm");

var _Product = require("../entities/Product");

class ProductsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Product.Product);
  }

  async update(id, data) {
    await this.repository.update(id, data);
  }

  async findById(id) {
    return await this.repository.findOne(id);
  }

  async removeIds(ids) {
    ids.map(async id => {
      await this.repository.delete({
        id
      });
    });
  }

  async listAll() {
    return await this.repository.find();
  }

  async findByIds(ids) {
    return await this.repository.findByIds(ids);
  }

  async create(data) {
    const product = this.repository.create(data);
    return await this.repository.save(product);
  }

}

exports.ProductsRepository = ProductsRepository;