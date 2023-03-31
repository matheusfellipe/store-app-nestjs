/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common/decorators';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { CreateUserUseCase } from './create-user.usecase';

@Controller('/users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const output = await this.createUserUseCase.execute(userData);
    return output;
  }
}
