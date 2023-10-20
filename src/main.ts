import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // yarn add class-validator class-transformer
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 白名单验证，过滤未使用任何验证装饰器属性
      transform: true, // 根据其 DTO 类类型化的对象
      forbidNonWhitelisted: true, // 验证器将抛出异常而不是剥离非白名单属性
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
}
bootstrap();
