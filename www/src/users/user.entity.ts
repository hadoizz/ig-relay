import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany } from 'typeorm'
import { Job } from '../jobs/job.entity'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId?: number

  @Column() 
  @Unique(this.username)
  username: string

  @Column()
  password: string

  @OneToMany(type => Job, job => job.belongsTo)
  jobs?: Job[]
}