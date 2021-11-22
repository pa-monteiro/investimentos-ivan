"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePayments1637273661438 = void 0;

var _typeorm = require("typeorm");

class CreatePayments1637273661438 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "payments",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "product_id",
        type: "uuid"
      }, {
        name: "user_id",
        type: "uuid"
      }, {
        name: "value",
        type: "numeric"
      }, {
        name: "type",
        type: "varchar"
      }, {
        name: "receipt_image",
        type: "varchar",
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
    await queryRunner.dropTable("payments");
  }

}

exports.CreatePayments1637273661438 = CreatePayments1637273661438;