/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common/decorators';
import { GenerateIdProvider } from 'src/infra/@shared/providers/generate-id.provider';
import { UsersMemoryRepository } from './repository/implementations/users.memory.repository';
import { CreateUserController } from './useCases/create-user.controller';
import { CreateUserUseCase } from './useCases/create-user.useCase';

@Module({
  controllers: [CreateUserController],
  providers: [GenerateIdProvider, UsersMemoryRepository, CreateUserUseCase],
})
export class UsersModule {}
