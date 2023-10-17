import { Type } from 'class-transformer';
import { IsOptional, IsPositive, isPositive } from 'class-validator';

export class PaginationCoffeeDto {
  @IsOptional() // 检查value是否缺失，如果缺失，则忽略所有验证器
  @IsPositive() // 检测是否为正数
  @Type(() => Number) // 将接收参数转换为数字类型
  limit: number;

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  offset: number;
}
