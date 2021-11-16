"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = require("../../infra/typeorm/entities/User");

class UsersRepositoryInMemory {
  constructor() {
    this.users = [];
  }

  async create(data) {
    const user = new _User.User();
    Object.assign(user, data);
    this.users.push(user);
    return user;
  }

  updateById(id, {
    deadline,
    email,
    name
  }) {
    const user = this.users.find(u => u.id === id);
    user.email = email;
    user.deadline = deadline;
    user.name = name;
    this.users.push(user);
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async findById(id) {
    return this.users.find(user => user.id === id);
  }

  async listAll() {
    return this.users;
  }

  async removeIds(ids) {
    const users = this.users.filter(u => !ids.includes(u.id));
    this.users = users;
  }

}

var _default = UsersRepositoryInMemory;
exports.default = _default;