import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoGenerate1711438743530 implements MigrationInterface {
    name = 'AutoGenerate1711438743530'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "experience" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "student_id" integer NOT NULL, "title" character varying NOT NULL, "start_month" TIMESTAMP NOT NULL, "end_month" TIMESTAMP NOT NULL, "description" character varying, CONSTRAINT "PK_5e8d5a534100e1b17ee2efa429a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "student_id" integer NOT NULL, "language_name" character varying NOT NULL, "level" character varying NOT NULL, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "skillSet" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, CONSTRAINT "PK_c0533ac5e1a8329de231edaf9bf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "student_skill_sets_skill_set" ("studentId" integer NOT NULL, "skillSetId" integer NOT NULL, CONSTRAINT "PK_abf84b87f12f092b213887362d7" PRIMARY KEY ("studentId", "skillSetId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a06a9218635dca94573c6e8dda" ON "student_skill_sets_skill_set" ("studentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_33427ab594df5fe6f53cb78d03" ON "student_skill_sets_skill_set" ("skillSetId") `);
        await queryRunner.query(`ALTER TABLE "student" ADD "resume" character varying`);
        await queryRunner.query(`ALTER TABLE "student" ADD "transcript" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isConfirmed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "company" ADD "size" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "UQ_c41a1d36702f2cd0403ce58d33a" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "type_flag"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "type_flag" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP CONSTRAINT "PK_ca872ecfe4fef5720d2d39e4275"`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD CONSTRAINT "PK_ca872ecfe4fef5720d2d39e4275" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "proposal" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "proposal" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "project_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "student_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "cover_letter"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "cover_letter" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "status_flag"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "status_flag" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "disable_flag"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "disable_flag" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6"`);
        await queryRunner.query(`ALTER TABLE "education" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "education" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "education" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "education" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "education" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "education" ADD "student_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" DROP COLUMN "school_name"`);
        await queryRunner.query(`ALTER TABLE "education" ADD "school_name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" ALTER COLUMN "start_year" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" ALTER COLUMN "end_year" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tech_stack" DROP CONSTRAINT "PK_28ce6942fffe078dd648ae71d4a"`);
        await queryRunner.query(`ALTER TABLE "tech_stack" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ADD CONSTRAINT "PK_28ce6942fffe078dd648ae71d4a" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tech_stack" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "PK_3d8016e1cb58429474a3c041904"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "UQ_0cc43638ebcf41dfab27e62dc09" UNIQUE ("user_id")`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "fullname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "tech_stack_id"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "tech_stack_id" integer`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "UQ_6c70ebe41780fbf6b7f95af420f" UNIQUE ("tech_stack_id")`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" SET DEFAULT '{USER}'`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "updated_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "fullname" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "company_name"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "company_name" character varying`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "website"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "website" character varying`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "description" character varying`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD CONSTRAINT "FK_cc40b9cbd32d498a4130818b83d" FOREIGN KEY ("project_id") REFERENCES "project"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD CONSTRAINT "FK_e318d6567d5374116e2d7710402" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "FK_0a4de5537f8f9e8475e21c84719" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "experience" ADD CONSTRAINT "FK_ec5f5e26e58b3e97ce7b711bf7c" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "language" ADD CONSTRAINT "FK_863483ad2f2b616484832fce269" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_0cc43638ebcf41dfab27e62dc09" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "FK_6c70ebe41780fbf6b7f95af420f" FOREIGN KEY ("tech_stack_id") REFERENCES "tech_stack"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "student_skill_sets_skill_set" ADD CONSTRAINT "FK_a06a9218635dca94573c6e8dda4" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "student_skill_sets_skill_set" ADD CONSTRAINT "FK_33427ab594df5fe6f53cb78d03f" FOREIGN KEY ("skillSetId") REFERENCES "skillSet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_skill_sets_skill_set" DROP CONSTRAINT "FK_33427ab594df5fe6f53cb78d03f"`);
        await queryRunner.query(`ALTER TABLE "student_skill_sets_skill_set" DROP CONSTRAINT "FK_a06a9218635dca94573c6e8dda4"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_6c70ebe41780fbf6b7f95af420f"`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "FK_0cc43638ebcf41dfab27e62dc09"`);
        await queryRunner.query(`ALTER TABLE "language" DROP CONSTRAINT "FK_863483ad2f2b616484832fce269"`);
        await queryRunner.query(`ALTER TABLE "experience" DROP CONSTRAINT "FK_ec5f5e26e58b3e97ce7b711bf7c"`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "FK_0a4de5537f8f9e8475e21c84719"`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP CONSTRAINT "FK_e318d6567d5374116e2d7710402"`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP CONSTRAINT "FK_cc40b9cbd32d498a4130818b83d"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "website"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "website" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "company_name"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "company_name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "fullname" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "company" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "company" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "roles" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "UQ_6c70ebe41780fbf6b7f95af420f"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "tech_stack_id"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "tech_stack_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "fullname"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "fullname" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "UQ_0cc43638ebcf41dfab27e62dc09"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "user_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "student" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "PK_3d8016e1cb58429474a3c041904"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "student" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "tech_stack" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ADD "name" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tech_stack" DROP CONSTRAINT "PK_28ce6942fffe078dd648ae71d4a"`);
        await queryRunner.query(`ALTER TABLE "tech_stack" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tech_stack" ADD CONSTRAINT "PK_28ce6942fffe078dd648ae71d4a" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "education" ALTER COLUMN "end_year" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" ALTER COLUMN "start_year" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" DROP COLUMN "school_name"`);
        await queryRunner.query(`ALTER TABLE "education" ADD "school_name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "education" ADD "student_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "education" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "education" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" DROP CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6"`);
        await queryRunner.query(`ALTER TABLE "education" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "education" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "education" ADD CONSTRAINT "PK_bf3d38701b3030a8ad634d43bd6" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "disable_flag"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "disable_flag" smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "status_flag"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "status_flag" smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "cover_letter"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "cover_letter" text`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "student_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "project_id"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "project_id" bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "proposal" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "proposal" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP CONSTRAINT "PK_ca872ecfe4fef5720d2d39e4275"`);
        await queryRunner.query(`ALTER TABLE "proposal" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "proposal" ADD CONSTRAINT "PK_ca872ecfe4fef5720d2d39e4275" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "type_flag"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "type_flag" smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "description" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "title" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "created_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "project" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57"`);
        await queryRunner.query(`ALTER TABLE "project" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "project" ADD "id" BIGSERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "UQ_c41a1d36702f2cd0403ce58d33a"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "size"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isConfirmed"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "transcript"`);
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "resume"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_33427ab594df5fe6f53cb78d03"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a06a9218635dca94573c6e8dda"`);
        await queryRunner.query(`DROP TABLE "student_skill_sets_skill_set"`);
        await queryRunner.query(`DROP TABLE "skillSet"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TABLE "experience"`);
    }

}
