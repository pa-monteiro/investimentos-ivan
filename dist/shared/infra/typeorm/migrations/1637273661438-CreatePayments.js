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
        name: "start_date",
        type: "date",
        isNullable: true
      }, {
        name: "release_date",
        type: "date",
        isNullable: true
      }, {
        name: "receipt_image",
        type: "varchar",
        isNullable: true
      }, {
        name: "accepted_at",
        type: "date",
        isNullable: true
      }, {
        name: "accepted_by",
        type: "uuid",
        isNullable: true
      }, {
        name: "status",
        type: "enum",
        enum: ["pending", "accepted", "released", "free", "canceled"]
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }, {
        name: "updated_at",
        type: "timestamp",
        default: "now()"
      }],
      foreignKeys: [{
        name: 'FKPaymentsProducts',
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        columnNames: ['product_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }, {
        name: 'FKPaymentsUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }, {
        name: 'FKPaymentsAcceptedBy',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['accepted_by'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("payments");
  }

}

exports.CreatePayments1637273661438 = CreatePayments1637273661438;