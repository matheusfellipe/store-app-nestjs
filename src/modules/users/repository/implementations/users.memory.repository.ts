/* eslint-disable prettier/prettier */

import { Injectable } from '@nestjs/common';
import { UsersEntity } from '../../entities/users.entity';
import { IUserRepository } from '../users.repository';

@Injectable()
export class UsersMemoryRepository implements IUserRepository {
  users: UsersEntity[];
  private static instance: UsersMemoryRepository;

  constructor() {
    this.users = [];
  }

  static getInstance() {
    if (!UsersMemoryRepository.instance) {
      UsersMemoryRepository.instance = new UsersMemoryRepository();
    }

    return UsersMemoryRepository.instance;
  }

  async findByEmail(email: string): Promise<UsersEntity> {
    return this.users.find((user) => user.email === email);
  }

  async save(data: UsersEntity): Promise<UsersEntity> {
    const { password, ...rest } = data;
    this.users.push({
      ...rest,
      password,
    });
    return data;
  }
}
