import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationCoffeeDto } from './dto/pagination-coffee.dto/pagination-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Coffee } from './entities/coffees.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffee.constants';
import { ConfigService, ConfigType } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

// @Injectable({ scope: Scope.REQUEST })
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
    private readonly dataSource: DataSource,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    private readonly configService: ConfigService,
    @Inject(coffeesConfig.KEY)
    private readonly coffeeConfig: ConfigType<typeof coffeesConfig>,
  ) {
    // this.configService.get(coffeeConfig.foo)
    console.log(coffeeConfig);
    // const config = this.configService.get('environment');
    // console.log(config);
    // console.log('coffeeBrands => ', coffeeBrands);
    // console.log('服务初始化！');
  }

  // 事务的运用
  async recomendCoffee(coffee: Coffee) {
    // 创建查询运行器
    const queryRunner = await this.dataSource.createQueryRunner();
    // 建立连接
    await queryRunner.connect();
    // 打开一个新事务
    await queryRunner.startTransaction();

    try {
      const recomendEvent = new Event();
      console.log('recomendEvent => :', recomendEvent);
      recomendEvent.name = 'recomendEvent_coffee';
      recomendEvent.type = 'coffee';
      recomendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recomendEvent);

      //
      await queryRunner.commitTransaction();
    } catch (error) {
      // 捕捉到异常  回滚事务
      await queryRunner.rollbackTransaction();
    } finally {
      // 手动释放连接
      await queryRunner.release();
    }
  }

  //   获取全部数据
  async findAll(paginationCoffeeDto: PaginationCoffeeDto) {
    let { limit, offset = 1 } = paginationCoffeeDto;
    return await this.coffeeRepository.find({
      relations: ['flavors'],
      skip: (offset - 1) * limit, // 跳过offset个数据
      take: limit, // 每页显示数据
      order: {
        // 排序  根据创建时间升序
        createdAt: 'ASC',
      },
    });
  }

  //   查找
  async findOne(id: string) {
    // return this.coffees.find((item) => item.id === +id);
    const coffee = await this.coffeeRepository.find({
      where: { id },
      relations: ['flavors'],
    });

    if (!coffee.length) {
      throw new NotFoundException(`coffee ${id} not found`);
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
  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    // const coffee = await this.coffeeRepository.findBy({ id });
    // 判断flavors是否存在
    console.log('修改 => flavors');

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
