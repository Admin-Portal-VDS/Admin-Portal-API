import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1737039785433 implements MigrationInterface {
  name = 'AddUserTable1737039785433';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
