/* eslint-disable prettier/prettier */
import { UsersEntity } from '../entities/users.entity';

export interface IUserRepository {
  findByEmail(email: string): Promise<UsersEntity | null>;
  save(data: UsersEntity): Promise<UsersEntity>;
}
