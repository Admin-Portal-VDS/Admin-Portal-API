import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserTable1736338057899 implements MigrationInterface {
  name = 'AddUserTable1736338057899';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "role" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "label" character varying NOT NULL, CONSTRAINT "UQ_ee999bb389d7ac0fd967172c41f" UNIQUE ("code"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."group_status_enum" AS ENUM('active', 'inactive', 'pending', 'suspended')`,
    );
    await queryRunner.query(
      `CREATE TABLE "group" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying(500) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "last_update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "status" "public"."group_status_enum" NOT NULL DEFAULT 'active', "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_256aa0fda9b1de1a73ee0b7106b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "login_name" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "role_id" integer, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_groups" ("user_id" integer NOT NULL, "group_id" integer NOT NULL, CONSTRAINT "PK_c95039f66f5d7a452fc53945bfe" PRIMARY KEY ("user_id", "group_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_95bf94c61795df25a515435010" ON "user_groups" ("user_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4c5f2c23c34f3921fbad2cd394" ON "user_groups" ("group_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups" ADD CONSTRAINT "FK_95bf94c61795df25a5154350102" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups" ADD CONSTRAINT "FK_4c5f2c23c34f3921fbad2cd3940" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_groups" DROP CONSTRAINT "FK_4c5f2c23c34f3921fbad2cd3940"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_groups" DROP CONSTRAINT "FK_95bf94c61795df25a5154350102"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4c5f2c23c34f3921fbad2cd394"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_95bf94c61795df25a515435010"`,
    );
    await queryRunner.query(`DROP TABLE "user_groups"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "group"`);
    await queryRunner.query(`DROP TYPE "public"."group_status_enum"`);
    await queryRunner.query(`DROP TABLE "role"`);
  }
}
