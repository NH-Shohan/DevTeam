import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { UsersEntity } from './user.entity';
import { UsersService } from './user.service';
import { CreateUserDTO } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async createUser(
    @Body(new ValidationPipe()) userDTO: CreateUserDTO,
  ): Promise<UsersEntity> {
    return this.usersService.createUser(userDTO);
  }

  @Delete('delete/:email')
  async deleteUserByEmail(@Param('email') email: string): Promise<void> {
    return this.usersService.deleteUserByEmail(email);
  }
}
