import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly usersRepository: Repository<User>){}

  async getUsers(): Promise<User[]>{
    return await this.usersRepository.find()
  }

  async getUser(where: { [key: string]: any }): Promise<User>{
    return await this.usersRepository.findOne({ where })
  }

  async updateUser(user: User){
    this.usersRepository.save(user)
  }

  async deleteUser(user: User){
    this.usersRepository.delete(user)
  }

  async createUser(user: User){
    this.usersRepository.save(user)
  }
}
