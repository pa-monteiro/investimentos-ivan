import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePayments1637273661438 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "payments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name:"product_id",
                        type: "uuid"
                    },
                    {
                        name:"user_id",
                        type: "uuid"
                    },
                    {
                        name: "value",
                        type: "numeric"
                    },
                    {
                        name: "type",
                        type: "varchar"
                    },
                    {
                        name: "start_date",
                        type: "date",
                        isNullable: true
                    },
                    {
                        name: "release_date",
                        type: "date",
                        isNullable: true
                    },
                    {
                        name: "receipt_image",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "accepted_at",
                        type: "date",
                        isNullable: true
                    },
                    {
                        name: "accepted_by",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["pending","accepted","released","free", "canceled"]
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKPaymentsProducts',
                        referencedTableName: 'products',
                        referencedColumnNames: ['id'],
                        columnNames: ['product_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKPaymentsUser',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE'
                    },
                    {
                        name: 'FKPaymentsAcceptedBy',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['accepted_by'],
                        onDelete: 'SET NULL',
                        onUpdate: 'CASCADE'
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payments");
    }

}
