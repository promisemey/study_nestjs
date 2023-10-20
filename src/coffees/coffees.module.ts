import { Injectable, Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffees.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

class ConfigService {}
class PduConfigService {}
class DevConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['蜜雪冰城', '霸王茶姬'];
  }
}

@Module({
  imports: [
    TypeOrmModule.forFeature([Coffee, Flavor, Event]),
    ConfigModule.forFeature(coffeesConfig),
  ],
  controllers: [CoffeesController],
  // providers: [CoffeesService],
  providers: [
    CoffeesService,
    // CoffeeBrandsFactory,
    // {
    //   provide: ConfigService, // 令牌
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevConfigService
    //       : PduConfigService,
    // },
    {
      provide: COFFEE_BRANDS,
      // useValue: ['星巴克', '上岸咖啡'],
      useFactory: async (connection: Connection): Promise<String[]> => {
        const coffee = await Promise.resolve(['星巴克', '上岸咖啡']);
        console.log('== 异步工厂 ==');
        return coffee;
      },
      inject: [Connection], // 接收一个提供者数组
      scope: Scope.TRANSIENT,
    },
  ],
  exports: [CoffeesService], //
})
export class CoffeesModule {}
