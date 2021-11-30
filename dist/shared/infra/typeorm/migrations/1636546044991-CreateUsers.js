"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsers1636546044991 = void 0;

var _typeorm = require("typeorm");

class CreateUsers1636546044991 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "users",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "email",
        type: "varchar",
        isUnique: true
      }, {
        name: "cpf",
        type: "numeric",
        isUnique: true,
        isNullable: true
      }, {
        name: "phone",
        type: "numeric",
        isUnique: true,
        isNullable: true
      }, {
        name: "cep",
        type: "numeric",
        isNullable: true
      }, {
        name: "address",
        type: "varchar",
        isNullable: true
      }, {
        name: "number",
        type: "varchar",
        isNullable: true
      }, {
        name: "neighborhood",
        type: "varchar",
        isNullable: true
      }, {
        name: "complement",
        type: "varchar",
        isNullable: true
      }, {
        name: "password",
        type: "varchar"
      }, {
        name: "isAdmin",
        type: "boolean",
        default: false
      }, {
        name: 'avatar',
        type: 'varchar',
        isNullable: true
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }, {
        name: "updated_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("users");
  }

}

exports.CreateUsers1636546044991 = CreateUsers1636546044991;