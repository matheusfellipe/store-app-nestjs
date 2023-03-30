/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common/decorators';
import { GenerateIdProvider } from 'src/infra/@shared/providers/generate-id.provider';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UsersEntity } from '../entities/users.entity';
import { UsersMemoryRepository } from '../repository/implementations/users.memory.repository';

@Controller('/users')
export class CreateUserController {
  constructor(
    private userRepository: UsersMemoryRepository,
    private id: GenerateIdProvider,
  ) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    const userEntity = new UsersEntity();
    const id = this.id.generate();
    userEntity.id = id;
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userData.password = userData.password;

    this.userRepository.save(userEntity);

    return {
      message: 'user has been created!',
    };
  }
}
