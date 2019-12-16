import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../users/user.entity'

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  jobId: number

  @Column()
  cron: string

  @Column()
  evaluate: string

  @ManyToOne(type => User, user => user.jobs)
  belongsTo: User
}