import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('coffees') // coffees 为表
@Entity() // coffee 为表
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('json', { nullable: true }) // json对象 不可以为空
  flavors: string[];
}
