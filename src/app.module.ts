import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Nest1Controller } from './nest_1/nest_1.controller';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  controllers: [AppController, Nest1Controller],
  providers: [AppService],
})
export class AppModule {}
