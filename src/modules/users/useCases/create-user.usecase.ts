/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UsersMemoryRepository } from '../repository/implementations/users.memory.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UsersMemoryRepository) {}

  async execute(input: CreateUserDTO) {
    const { email } = input;
    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new Error('User already exists!');
    }
    const user = await this.userRepository.save(input);
    return user;
  }
}
