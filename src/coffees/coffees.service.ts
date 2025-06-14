import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Coffee } from './enitities/coffee.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Flavor } from './enitities/flavor.entities';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly CoffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly FlavorRepository: Repository<Flavor>,
  ) {}

  async findAll() {
    return await this.CoffeeRepository.find({
      relations: ['flavors'],
    });
  }

  async findOne(id: string) {
    const coffee = await this.CoffeeRepository.findOne({
      where: { id: +id },
      relations: ['flavors'],
    });
    if (!coffee) {
      throw new HttpException(
        `cannot find coffee with this ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );
    const coffee = this.CoffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    });
    return await this.CoffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors?.map((name) => this.preloadFlavorByName(name)),
      ));
    const coffee = await this.CoffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`coffee #${id} not found`);
    }
    return this.CoffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.CoffeeRepository.remove(coffee);
  }
  //like creating a flavor from flavor repo
  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.FlavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.FlavorRepository.create({ name });
  }
}
