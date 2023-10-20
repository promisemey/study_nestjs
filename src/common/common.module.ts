import { Module } from '@nestjs/common';
import { ApiKeyGuard } from './guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule {}
