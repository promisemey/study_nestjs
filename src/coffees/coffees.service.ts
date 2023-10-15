import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffees.entities';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: '酱香拿铁',
      brand: '瑞幸咖啡',
      flavors: ['茅台', '炼乳', '生牛乳'],
    },
  ];
  //   获取全部数据
  findAll() {
    return this.coffees;
  }

  //   查找
  findOne(id: string | number) {
    return this.coffees.find((item) => item.id === +id);
  }

  //   创建
  create(createCoffee: Coffee) {
    this.coffees.push(createCoffee);
  }

  //   修改
  update(id: string | number, updateCoffee: any) {
    const existingCoffee = this.findOne(id);
    if (existingCoffee) {
      // TODO... 存在操作
    }
  }

  //   删除
  remove(id: string | number) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
