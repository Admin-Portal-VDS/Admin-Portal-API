import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserTable1736238450552 implements MigrationInterface {
    name = 'AddUserTable1736238450552'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
    }

}
