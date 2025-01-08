import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1736318772993 implements MigrationInterface {
  name = 'AddUserTable1736318772993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
  }
}
