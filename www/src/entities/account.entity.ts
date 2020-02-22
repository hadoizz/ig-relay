import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, BeforeInsert } from 'typeorm'
import { Job } from './job.entity'
import { User } from './user.entity'
import { Log } from './log.entity'
import { Followed } from './followed.entity'
import getRandomDevice from '../accounts/utils/devices/getRandomDevice'

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  accountId?: number

  @Column()
  login: string

  @Column()
  device: string

  @Column({ default: false })
  logged: boolean

  @ManyToOne(type => User, user => user.accounts, { cascade: ['insert'] })
  user: User

  @OneToMany(type => Job, job => job.account, { cascade: ['insert'] })
  jobs?: Job[]

  @OneToMany(type => Log, log => log.account, { cascade: ['insert'] })
  logs?: Log[]

  @OneToMany(type => Followed, Followed => Followed.account, { cascade: ['insert'] })
  followed?: Followed[]
}