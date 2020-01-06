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
  sleepMin?: number

  @Column({ default: 0 })
  sleepMax?: number

  @Column()
  createdAt?: number

  @BeforeInsert()
  updateDateCreation(){
    this.createdAt = Math.round(new Date().getTime() / 1000)
  }

  @ManyToOne(type => Account, account => account.jobs)
  account: Account
}