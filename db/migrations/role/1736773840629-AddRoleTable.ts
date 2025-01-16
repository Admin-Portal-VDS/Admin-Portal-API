import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleTable1736773840629 implements MigrationInterface {
  name = 'AddRoleTable1736773840629';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "role" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role_id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role_id" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role_id"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "role_id" integer`);
    await queryRunner.query(
      `ALTER TABLE "role" DROP CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2"`,
    );
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "id"`);
    await queryRunner.query(`ALTER TABLE "role" ADD "id" SERIAL NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "role" ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
