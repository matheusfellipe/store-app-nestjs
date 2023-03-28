/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common/decorators';

@Controller('/users')
export class CreateUserController {
  @Post()
  async createUser(@Body() userData) {
    return userData;
  }
}
