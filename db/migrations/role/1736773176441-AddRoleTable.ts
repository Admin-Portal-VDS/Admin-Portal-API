import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleTable1736773176441 implements MigrationInterface {
  name = 'AddRoleTable1736773176441';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" ADD "label" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "label"`);
  }
}
