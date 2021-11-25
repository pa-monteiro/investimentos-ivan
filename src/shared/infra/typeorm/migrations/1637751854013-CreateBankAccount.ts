import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBankAccount1637751854013 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'bank_accounts',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "isAdmin",
                        type: "boolean"
                    },
                    {
                        name: "full_name",
                        type: "varchar"
                    },
                    {
                        name: "agency",
                        type: "varchar"
                    },
                    {
                        name: "account",
                        type: "varchar"
                    },
                    {
                        name: "cpf",
                        type: "varchar"
                    },
                    {
                        name: "pix",
                        type: "varchar"
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('bank_accounts')
    }

}
