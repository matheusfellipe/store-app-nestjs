/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common/decorators';
import { UsersEntity } from '../entities/users.entity';

@Controller('/users')
export class CreateUserController {
  @Post()
  async createUser(@Body() userData): Promise<UsersEntity> {
    return userData;
  }
}
