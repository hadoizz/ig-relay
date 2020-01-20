import { Entity, Column, OneToMany, Index, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Account } from '../accounts/account.entity'

@Entity()
@Index(['account','login'], { unique: true })
export class Followed {
  @PrimaryGeneratedColumn()
  followedId?: number

  @Column()
  login: string

  @Column({ default: false })
  unfollowed: boolean

  @ManyToOne(type => Account, account => account.followed, { cascade: ['insert'] })
  account: Account

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt?: string
}
