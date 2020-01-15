import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { Job } from '../jobs/job.entity'
import { User } from '../users/user.entity'
import { Log } from '../logs/log.entity'
import { Followed } from '../logs/followed.entity'

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