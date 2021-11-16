"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDailyPostings1636678232713 = void 0;

var _typeorm = require("typeorm");

class CreateDailyPostings1636678232713 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "daily_postings",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "value",
        type: "varchar"
      }, {
        name: "date",
        type: "timestamp"
      }, {
        name: "user_id",
        type: "uuid"
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FKUserDailyPosting',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("daily_postings");
  }

}

exports.CreateDailyPostings1636678232713 = CreateDailyPostings1636678232713;