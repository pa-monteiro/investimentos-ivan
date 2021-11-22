"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepository = void 0;

var _typeorm = require("typeorm");

var _User = require("@modules/account/infra/typeorm/entities/User");

class UsersRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_User.User);
  }

  async findByUserIdProducts(id) {
    return await this.repository.findOne(id, {
      relations: ['products']
    });
  }

  async updateById(id, data) {
    await this.repository.update(id, data);
  }

  async removeIds(ids) {
    ids.map(async id => {
      await this.repository.delete({
        id
      });
    });
  }

  async listAll() {
    return await this.repository.find({
      select: ["id", "name", "email", "deadline"],
      relations: ["products"]
    });
  }

  async create(data) {
    const user = this.repository.create(data);
    await this.repository.save(user);
    return user;
  }

  async findByEmail(email) {
    return await this.repository.findOne({
      email
    });
  }

  async findById(id) {
    return await this.repository.findOne(id);
  }

  async findByIds(ids) {
    return await this.repository.findByIds(ids);
  }

}

exports.UsersRepository = UsersRepository;