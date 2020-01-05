import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { JobEntity } from '../jobs/job.entity'
import { UserEntity } from 'src/users/user.entity'

@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn()
  accountId?: number

  @Column()
  login: string

  @Column()
  password: string

  @ManyToOne(type => UserEntity, user => user.account)
  user: UserEntity

  @OneToMany(type => JobEntity, job => job.account)
  jobs?: JobEntity[]
}