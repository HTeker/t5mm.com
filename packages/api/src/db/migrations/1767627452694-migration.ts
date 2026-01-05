import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1767627452694 implements MigrationInterface {
    name = 'Migration1767627452694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_d850dd21f9d083eb3e67be8014"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8de57c0e8ab25fbd1d3ab7294d" ON "subscriptions" ("subscriberUuid", "newsletter") WHERE "deletedAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_8de57c0e8ab25fbd1d3ab7294d"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d850dd21f9d083eb3e67be8014" ON "subscriptions" ("newsletter", "subscriberUuid") `);
    }

}
