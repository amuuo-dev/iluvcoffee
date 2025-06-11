/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

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
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `this action updates #${id} coffees`;
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `this action removes the #${id} coffee`;
  }
}
