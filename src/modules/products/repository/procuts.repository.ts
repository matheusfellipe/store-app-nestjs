/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Post()
  async createProducts(@Body() input) {
    return input;
  }
}
