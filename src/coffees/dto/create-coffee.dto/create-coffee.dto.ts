import { IsString } from 'class-validator';

export class CreateCoffeeDto {
  // 数据传输对象
  @IsString()
  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true }) // 指定验证值是否为数组，并且必须验证其中的每个项。
  readonly flavors: string[];
}
