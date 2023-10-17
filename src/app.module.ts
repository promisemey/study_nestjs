import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Nest1Controller } from './nest_1/nest_1.controller';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: 'root',
      database: 'mysql',
      autoLoadEntities: true, // 启用自动加载所有实体类
      synchronize: true, // 启用自动同步，只在开发中使用
      timezone: 'Z', // 转换为中国时区
    }),
  ],
  controllers: [AppController, Nest1Controller],
  providers: [AppService],
})
export class AppModule {}
