/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() queryPagination) {
    const { limit, offset } = queryPagination;
    return `this returns all coffees available ${offset} and here is the ${limit}`;
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
