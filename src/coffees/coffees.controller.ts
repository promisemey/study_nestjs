import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Patch,
  Delete,
  Query,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationCoffeeDto } from './dto/pagination-coffee.dto/pagination-coffee.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    // console.log('控制器已创建！', request.headers);
  }

  @Get() // 装饰器
  findAll(@Query() paginationCoffeeDto: PaginationCoffeeDto) {
    return this.coffeesService.findAll(paginationCoffeeDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const coffee = await this.coffeesService.findOne(id);
    if (!coffee) {
      // 抛出异常状态码
      // throw new HttpException(`coffee ${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`coffee ${id} not found`);
    }
    // return { statusCode: HttpStatus.OK, data: coffee };
    return coffee;
  }

  // 获取指定参数
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  // 获取指定参数
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  // 获取指定参数
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.coffeesService.remove(id);
  }
}
