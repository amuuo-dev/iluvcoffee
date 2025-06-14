import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Flavor } from './flavor.entities';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @ManyToMany(() => Flavor, (flavor) => flavor.coffees)
  flavors: Flavor[];
}
