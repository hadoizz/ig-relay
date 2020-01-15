import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, BeforeInsert } from 'typeorm';
import { Account } from '../accounts/account.entity'

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  jobId: number

  @Column()
  cron: string

  @Column()
  supervisor: string

  @Column()
  supervisorPayload?: string

  @Column({ default: 0 })
  maxDelaySeconds?: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt?: string

  @ManyToOne(type => Account, account => account.jobs, { cascade: ['insert'] })
  account: Account
}