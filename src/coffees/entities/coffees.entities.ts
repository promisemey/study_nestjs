import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Flavor } from './flavor.entities';

// @Entity('coffees') // coffees 为表
@Entity() // coffee 为表
export class Coffee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  uuid: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ default: 0 })
  recommendations: number; // 推荐

  // 用于多对多关系中，用于指定关系的所有者方。它还用于设置自定义连接表的名称、列名和引用列。
  @JoinTable()
  @ManyToMany(
    (type) => Flavor,
    (flavor) => flavor.coffees,
    { cascade: true }, // ['insert','update']
  )
  flavors: Flavor[];

  @CreateDateColumn()
  createdAt: Date; // 创建日期字段

  @UpdateDateColumn()
  updatedAt: Date; // 更新日期字段
}
