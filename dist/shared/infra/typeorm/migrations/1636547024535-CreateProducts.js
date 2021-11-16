"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateProducts1636547024535 = void 0;

var _typeorm = require("typeorm");

class CreateProducts1636547024535 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "products",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "type",
        type: "enum",
        enum: ['fixed', 'variable']
      }, {
        name: "percentage",
        type: "numeric"
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("products");
  }

}

exports.CreateProducts1636547024535 = CreateProducts1636547024535;