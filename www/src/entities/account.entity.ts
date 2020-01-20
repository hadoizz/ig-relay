import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { Job } from './job.entity'
import { User } from './user.entity'
import { Log } from './log.entity'
import { Followed } from './followed.entity'

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  accountId?: number

  @Column()
  login: string

  @Column({ select: false })
  password: string

  @ManyToOne(type => User, user => user.accounts, { cascade: ['insert'] })
  user: User

  @OneToMany(type => Job, job => job.account, { cascade: ['insert'] })
  jobs?: Job[]

  @OneToMany(type => Log, log => log.account, { cascade: ['insert'] })
  logs?: Log[]

  @OneToMany(type => Followed, Followed => Followed.account, { cascade: ['insert'] })
  followed?: Followed[]
}