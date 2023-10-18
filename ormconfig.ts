import { DataSource } from 'typeorm';

// module.exports = new DataSource({
//   type: 'mysql',
//   host: 'mysql',
//   port: 3307,
//   username: 'root',
//   password: 'root',
//   database: 'mysql',
//   entities: ['dist/**/*.entity{.js}'],
//   migrations: ['dist/migrations/*{.js}'],
//   cli: {
//     migrationsDir: 'src/migrations',
//   },
// });

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'mysql',
  // logging: false,
  // synchronize: false,
  name: 'default',
  entities: ['src/**/**.entity,.js'],
  migrations: ['src/migrations/**/*,.js'],
  // subscribers: ['src/subscriber/**/*{.ts,.js}'],
});

connectionSource.initialize();
// database.config.ts

// npx typeorm migration:create ./src/migrations/CoffeeRefactor

// 迁移
