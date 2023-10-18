import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1697641407963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      //   `ALTER TABLE "coffee" ALTER COLUMN "title" RENAME TO "name"`,
      `ALTER TABLE "coffee" RENAME COLUMN "name"  TO "title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" RENAME COLUMN "title"  TO "name"`,
    );
  }
}
