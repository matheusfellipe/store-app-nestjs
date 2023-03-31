/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common/decorators';
import { GenerateIdProvider } from 'src/@shared/providers/generate-id.provider';
import { UsersMemoryRepository } from './repository/implementations/users.memory.repository';
import { UsersPrismaRepository } from './repository/implementations/users.prisma.repository';
import { CreateUserController } from './useCases/create-user/create-user.controller';
import { CreateUserUseCase } from './useCases/create-user/create-user.usecase';

@Module({
  controllers: [CreateUserController],
  providers: [
    GenerateIdProvider,
    UsersMemoryRepository,
    UsersPrismaRepository,
    CreateUserUseCase,
  ],
})
export class UsersModule {}
