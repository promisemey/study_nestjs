import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Nest1Controller } from './nest_1/nest_1.controller';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      // ignoreEnvFile: true,
      // envFilePath: '.environment', //要加载的环境文件的路径。
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(3307),
      }),
    }),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true, // 启用自动加载所有实体类
      synchronize: true, // 启用自动同步，只在开发中使用
      timezone: 'Z', // 转换为中国时区
    }),
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController, Nest1Controller],
  providers: [AppService],
})
export class AppModule {}
