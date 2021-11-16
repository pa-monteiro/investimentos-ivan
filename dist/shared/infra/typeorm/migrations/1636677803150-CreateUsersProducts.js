"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsersProducts1636677803150 = void 0;

var _typeorm = require("typeorm");

class CreateUsersProducts1636677803150 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "users_products",
      columns: [{
        name: "user_id",
        type: "uuid"
      }, {
        name: "product_id",
        type: "uuid"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
    await queryRunner.createForeignKey("users_products", new _typeorm.TableForeignKey({
      name: "FKUserProducts",
      referencedTableName: "users",
      referencedColumnNames: ["id"],
      columnNames: ["user_id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    }));
    await queryRunner.createForeignKey("users_products", new _typeorm.TableForeignKey({
      name: "FKProductsUsers",
      referencedTableName: "products",
      referencedColumnNames: ["id"],
      columnNames: ["product_id"],
      onDelete: "SET NULL",
      onUpdate: "SET NULL"
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey("users_products", "FKUserProducts");
    await queryRunner.dropForeignKey("users_products", "FKProductsUsers");
    await queryRunner.dropTable("users_products");
  }

}

exports.CreateUsersProducts1636677803150 = CreateUsersProducts1636677803150;