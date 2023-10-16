import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffees.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';

@Injectable()
export class CoffeesService {
  // private coffees: Coffee[] = [
  //   {
  //     id: '1',
  //     name: '酱香拿铁',
  //     brand: '瑞幸咖啡',
  //     flavors: ['茅台', '炼乳', '生牛乳'],
  //   },
  // ];

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}
  //   获取全部数据

  async findAll() {
    return await this.coffeeRepository.find();
  }

  //   查找
  async findOne(id: string) {
    // return this.coffees.find((item) => item.id === +id);
    const coffee = await this.coffeeRepository.findBy({ id });
    if (!coffee) {
      throw new NotFoundException('coffee id not found');
    }
    return coffee;
  }

  //   创建
  create(createCoffeeDto: CreateCoffeeDto) {
    // const coffee = await this.coffeeRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Coffee)
    //   .values(createCoffee).execute();
    const coffee = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(coffee);
  }

  //   修改
  async update(id: string, updateCoffeeDto: any) {
    // const coffee = await this.coffeeRepository.findBy({ id });
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
    });
    if (!coffee) throw new NotFoundException(`coffee ${id} not found`);
    return this.coffeeRepository.save(coffee);
  }

  //   删除
  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }
}
