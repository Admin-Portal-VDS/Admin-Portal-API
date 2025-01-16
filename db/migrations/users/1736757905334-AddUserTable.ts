import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1736757905334 implements MigrationInterface {
  name = 'AddUserTable1736757905334';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "UQ_ee999bb389d7ac0fd967172c41f"`,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "label"`);
    await queryRunner.query(
      `CREATE TYPE "public"."role_name_enum" AS ENUM('SUPER_USER', 'ACCOUNT_ADMINISTRATOR', 'BILLING_ADMINISTRATOR', 'CALL_QUEUE_ADMINISTRATOR', 'CALL_QUEUE_REPORTING_ADMINISTRATOR', 'REPORTS_ADMINISTRATOR', 'USER_ADMINISTRATOR', 'END_USER', 'END_USER_NO_DASHBOARD')`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD "name" "public"."role_name_enum" NOT NULL DEFAULT 'SUPER_USER'`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "parent_id" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdBy" integer NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdBy"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "parent_id"`);
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "UQ_ae4578dcaed5adff96595e61660"`,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "name"`);
    await queryRunner.query(`DROP TYPE "public"."role_name_enum"`);
    await queryRunner.query(
      `ALTER TABLE "role" ADD "label" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD "code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "UQ_ee999bb389d7ac0fd967172c41f" UNIQUE ("code")`,
    );
  }
}
