import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
  Put,
  Patch,
} from '@nestjs/common';
import { AdminEntityService } from './Admin/admin.service';

// Create a DTO for user data
class CreateUserDto {
  name: string;
  id: number;
}
@Controller()
export class AppController {
  constructor(private readonly appService: AdminEntityService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // // first one
  // @Get('something/:id')
  // userId(@Param('id') id: string) {
  //   return `This action returns a #${id} cat`;
  // }

  // // second one
  // @Get('name/:name')
  // saerchUserName(@Param('name') name: string): string {
  //   console.log(name);
  //   return `This action returns a #${name} cat`;
  // }

  // // third one
  // @Get('nameandid')
  // searchNameAndId(
  //   @Query('name') name: string,
  //   @Query('id') id: string,
  // ): string {
  //   console.log(name); // "jitu"
  //   console.log(id); // "50"
  //   return `This action returns a ${name} cat with id ${id}`;
  // }

  // @Post('users')
  // createUser(@Body() createUserDto: CreateUserDto): string {
  //   const { name, id } = createUserDto;
  //   console.log(`User created with name: ${name} and ID: ${id}`);
  //   return `User created with name: ${name} and ID: ${id}`;
  // }
}
