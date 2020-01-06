import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { Job } from '../jobs/job.entity'
import { User } from '../users/user.entity'

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  accountId?: number

  @Column()
  login: string

  @Column()
  password: string

  @ManyToOne(type => User, user => user.account)
  user: User

  @OneToMany(type => Job, job => job.account)
  jobs?: Job[]
}