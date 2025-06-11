/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll() {
    return 'this returns all coffees available';
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `this is is the id ${id} and its dynamic`;
  }
  @Post()
  createCoffee(@Body() body) {
    return body;
  }
}
