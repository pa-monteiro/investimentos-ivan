import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateUsersProducts1636677803150 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_products",
                columns: [
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "product_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )

        await queryRunner.createForeignKey(
            "users_products",
            new TableForeignKey({
                name: "FKUserProducts",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        )

        await queryRunner.createForeignKey(
            "users_products",
            new TableForeignKey({
                name: "FKProductsUsers",
                referencedTableName: "products",
                referencedColumnNames: ["id"],
                columnNames: ["product_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            "users_products", "FKUserProducts" 
        )
        await queryRunner.dropForeignKey(
            "users_products", "FKProductsUsers" 
        )
        await queryRunner.dropTable("users_products");
    }

}
