/* eslint-disable prettier/prettier */
import { UsersPrismaRepository } from '../../repository/implementations/users.prisma.repository';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUserByEmailDTO } from '../../dto/get-user-by-email.dto';

@Injectable()
export class GetUserByEmailUseCase {
  private readonly logger: Logger = new Logger(GetUserByEmailUseCase.name);

  constructor(private readonly usersRepository: UsersPrismaRepository) {}

  async execute(input: GetUserByEmailDTO): Promise<User> {
    const student = await this.usersRepository.findByEmail(input.email);
    if (!student) {
      const error = new NotFoundException('User');
      this.logger.error(error.message);
      throw error;
    }
    this.logger.log('User found successfully');
    return student;
  }
}
