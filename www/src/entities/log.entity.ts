import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Index, ManyToOne } from 'typeorm'
import { Account } from './account.entity'

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  logId?: number

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  @Index()
  createdAt?: string

  @Column()
  type: string

  @Column({ default: null })
  payload?: string

  @ManyToOne(type => Account, account => account.logs, { cascade: ['insert'] })
  @Index()
  account?: Account
}
