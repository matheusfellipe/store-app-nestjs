/* eslint-disable prettier/prettier */

import { UsersEntity } from '../../entities/users.entity';
import { IUserRepository } from '../user.repository';

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

  async findById(id: string): Promise<UsersEntity | null> {
    return (
      this.users.find((user) => {
        user.id === id;
      }) || null
    );
  }

  async save(data: UsersEntity): Promise<UsersEntity> {
    this.users.push(data);
    return data;
  }
}