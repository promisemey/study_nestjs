import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1697685648555 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `coffee` CHANGE COLUMN `name` `title` varchar(255)',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `coffee` CHANGE COLUMN `title`  `name` varchar(255)',
    );
  }
}
