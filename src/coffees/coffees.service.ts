import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffees.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource, RelationId } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { Flavor } from './entities/flavor.entities';

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
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}
  //   获取全部数据

  async findAll() {
    return await this.coffeeRepository.find({
      relations: ['flavors'],
    });
  }

  //   查找
  async findOne(id: string) {
    // return this.coffees.find((item) => item.id === +id);
    const coffee = await this.coffeeRepository.find({
      where: { id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new NotFoundException('coffee id not found');
    }
    return coffee;
  }

  //   创建
  async create(createCoffeeDto: CreateCoffeeDto) {
    // const coffee = await this.coffeeRepository
    //   .createQueryBuilder()
    //   .insert()
    //   .into(Coffee)
    //   .values(createCoffee).execute();
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return this.coffeeRepository.save(coffee);
  }

  //   修改
  async update(id: string, updateCoffeeDto: any) {
    // const coffee = await this.coffeeRepository.findBy({ id });
    // 判断flavors是否存在
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    console.log('update => flavors', flavors);

    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) throw new NotFoundException(`coffee ${id} not found`);
    return this.coffeeRepository.save(coffee);
  }

  //   删除
  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  //
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    // 查找flavor中是否存在
    // findOne 返回第一个匹配查询条件的实体对象
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });

    console.log('preloadFlavorByName => existingFlavor', existingFlavor);
    // 存在则直接 return
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }
}
