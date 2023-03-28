/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common/decorators';
import { CreateUserController } from './controllers/create-user.controller';

@Module({
  controllers: [CreateUserController],
})
export class UsersModule {}
