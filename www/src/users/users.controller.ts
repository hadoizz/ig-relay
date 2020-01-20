import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService){}

  @Get(':id')
  get(@Param() params){
    return this.service.getUser(params.id)
  }

  @Post()
  create(@Body() user: User){
    return this.service.createUser(user)
  }

  @Put()
  update(@Body() user: User){
    return this.service.updateUser(user)
  }

  @Delete(':id')
  delete(@Param() params){
    return this.service.deleteUser(params.id)
  }
}
