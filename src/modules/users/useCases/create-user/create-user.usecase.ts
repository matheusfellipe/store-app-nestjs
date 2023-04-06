/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from '../../dto/create-user.dto';
// import { UsersMemoryRepository } from '../repository/implementations/users.memory.repository';
import { UsersPrismaRepository } from '../../repository/implementations/users.prisma.repository';
import { EncryptProvider } from 'src/@shared/providers';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UsersPrismaRepository,
    private encryptProvider: EncryptProvider,
  ) {}

  async execute(input: CreateUserDTO) {
    // eslint-disable-next-line no-console
    console.log(input);
    const { email } = input;
    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      throw new Error('User already exists!');
    }
    const password = await this.encryptProvider.encrypt(input.password, 13);
    const user = await this.userRepository.save(input, password);
    return user;
  }
}
