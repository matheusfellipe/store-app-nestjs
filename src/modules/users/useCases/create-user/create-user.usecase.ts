/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../dto/create-user.dto';
// import { UsersMemoryRepository } from '../repository/implementations/users.memory.repository';
import { UsersPrismaRepository } from '../../repository/implementations/users.prisma.repository';

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UsersPrismaRepository) {}

  async execute(input: CreateUserDTO) {
    // eslint-disable-next-line no-console
    console.log(input);
    const { email } = input;
    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new Error('User already exists!');
    }
    const user = await this.userRepository.save(input);
    return user;
  }
}
