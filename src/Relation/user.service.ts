import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './user.entity';
import { CreateUserDTO } from './user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async createUser(userDTO: CreateUserDTO): Promise<UsersEntity> {
    try {
      return this.usersRepository.save(userDTO);
    } catch (error) {
      throw error;
    }
  }

  async getUserByEmail(email: string): Promise<UsersEntity | null> {
    try {
      return this.usersRepository.findOne({ where: { email } }); // Fix here
    } catch (error) {
      throw error;
    }
  }

  async deleteUserByEmail(email: string): Promise<void> {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.usersRepository.remove(user);
    } catch (error) {
      throw error;
    }
  }
}
