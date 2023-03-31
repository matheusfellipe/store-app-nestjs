/* eslint-disable prettier/prettier */
import { prismaClient } from '../../../../infra/@shared/database/prisma.config';
import { UsersEntity } from '../../entities/users.entity';
import { IUserRepository } from '../users.repository';

export class UsersPrismaRepository implements IUserRepository {
  save(_data: UsersEntity): Promise<UsersEntity> {
    throw new Error('Method not implemented.');
  }
  async findByEmail(email: string): Promise<UsersEntity> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    return user || undefined;
  }
}
