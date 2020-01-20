import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm'
import { Account } from './account.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId?: number

  @Column() 
  @Unique(this.username)
  username: string

  @Column()
  password: string

  @OneToMany(type => Account, account => account.user, { cascade: ['insert'] })
  accounts?: Account[]
}