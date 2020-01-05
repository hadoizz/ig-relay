import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm'
import { AccountEntity } from '../accounts/account.entity'

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId?: number

  @Column() 
  @Unique(this.username)
  username: string

  @Column()
  password: string

  @OneToMany(type => AccountEntity, account => account.user)
  account?: AccountEntity
}