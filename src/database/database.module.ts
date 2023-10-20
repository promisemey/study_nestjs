import { DynamicModule, Module } from '@nestjs/common';
import { DataSourceOptions } from 'typeorm';

@Module({})
export class DatabaseModule {
  static register(option: DataSourceOptions): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          useValue: option,
        },
      ],
    };
  }
}
