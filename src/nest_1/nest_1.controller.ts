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
} from '@nestjs/common';
import { response } from 'express';

/**
 * 嵌套  访问形式  http://localhost:3000/nest-1/child
 */
@Controller('nest-1')
export class Nest1Controller {
  @Get('child') // 装饰器
  @Get() // 装饰器
  findAll(@Res() response) {
    response.status(200).send('这是一个GET请求');
    // return '这是一个GET请求';
  }

  //   @Get() // 装饰器
  //   findAll(@Query() query) {
  //     console.log(query);
  //     return '这是一个GET请求';
  //   }

  //   获取所有get请求参数
  //   @Get(':id')
  //   findOne(@Param() params) {
  //     return `获取动态参数 => ${params.id}`;
  //   }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `获取动态参数 => ${id}`;
  }

  //   @Post()
  //   create(@Body() body) {
  //     return body;
  //   }

  // 获取指定参数
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body('name') name: string) {
    return name;
  }

  // 获取指定参数
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates ${id} resource`;
  }

  // 获取指定参数
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action remove ${id} resource`;
  }
}
