/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { prismaClient } from '../../../../infra/@shared/database/prisma.config';
import { CreateUserDTO } from '../../dto/create-user.dto';
import { UsersEntity } from '../../entities/users.entity';
import { IUserRepository } from '../users.repository';

@Injectable()
export class UsersPrismaRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UsersEntity> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });
    return user || undefined;
  }

  async save(data: CreateUserDTO): Promise<User> {
    const { roleId, password, ...rest } = data;
    const createUser = await prismaClient.user.create({
      data: {
        ...rest,
        password,
        role: {
          connect: {
            id: roleId,
          },
        },
      },
    });
    return createUser;
  }
}
