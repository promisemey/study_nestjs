import { DataSource } from 'typeorm';

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'mysql',
  name: 'default',
  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/src/migrations/*.js'],
  // logging: false,
  synchronize: true,
  // subscribers: ['src/subscriber/**/*{.ts,.js}'],
});

// npx typeorm migration:create ./src/migrations/CoffeeRefactor
// 迁移

// 执行迁移
// yarn typeorm migration:run -d ./dist/ormconfig

// 回退迁移
// yarn typeorm migration:revert -d ./dist/ormconfig
