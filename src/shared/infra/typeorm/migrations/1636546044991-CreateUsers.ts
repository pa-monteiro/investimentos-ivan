import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1636546044991 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "cpf",
                        type: "numeric",
                        isUnique: true,
                        isNullable: true
                    },
                    {
                        name: "phone",
                        type: "numeric",
                        isUnique: true,
                        isNullable: true
                    },
                    {
                        name: "cep",
                        type: "numeric",
                        isNullable: true
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "number",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "neighborhood",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "complement",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "isAdmin",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true
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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users")
    }

}
