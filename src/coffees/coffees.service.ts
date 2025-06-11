/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Coffee } from './enitities/coffee.entities';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwear Roast',
      brand: 'Ducci gang',
      flavors: ['chocolate', 'vanila'],
    },
  ];
  private nextId = 1;

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    return this.coffees.find((item) => item.id === +id);
  }

  create(createCoffeeDto: Omit<Coffee, 'id'>) {
    const newCoffee = {
      id: this.nextId++,
      ...createCoffeeDto,
    };
    this.coffees.push(newCoffee);
    return newCoffee;
  }

  update(id: string, updateCoffeeDto: any) {
    const existingcoffee = this.findOne(id);
    if (existingcoffee) {
      //update the existiing coffee
    }
  }

  remove(id: string) {
    const coffeeIndex = this.coffees.findIndex((item) => item.id === +id);
    if (coffeeIndex >= 0) {
      this.coffees.splice(coffeeIndex, 1);
    }
  }
}
