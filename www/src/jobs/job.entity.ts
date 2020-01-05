import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { AccountEntity } from '../accounts/account.entity'

@Entity()
export class JobEntity {
  @PrimaryGeneratedColumn()
  jobId: number

  @Column()
  cron: string

  @Column()
  evaluate: string

  @ManyToOne(type => AccountEntity, account => account.jobs)
  account: AccountEntity
}