import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class CreateFKPaymentsUsers1639314604909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createForeignKey(
            "payments_users",
            new TableForeignKey({
                name: "FKPaymentsUser",
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                columnNames: ["user_id"],
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            })
        )

        await queryRunner.createForeignKey(
            "payments_users",
            new TableForeignKey({
                name: "FKPaymentsProduct",
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
            "payments_users", "FKPaymentsUser" 
        )
        await queryRunner.dropForeignKey(
            "payments_users", "FKPaymentsProduct" 
        )
    }

}
