import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  Patch,
  Delete,
  Query,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Get() // 装饰器
  findAll(@Query() query) {
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const coffee = this.coffeesService.findOne(id);
    if (!coffee) {
      // 抛出异常状态码
      // throw new HttpException(`coffee ${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`coffee ${id} not found`);
    }
    return { statusCode: HttpStatus.OK, data: coffee };
  }

  // 获取指定参数
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log('=>', createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  // 获取指定参数
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  // 获取指定参数
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
