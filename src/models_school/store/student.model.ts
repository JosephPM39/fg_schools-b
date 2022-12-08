import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsOptional, IsString, Length } from 'class-validator'
import { Order } from './order.model'

@Entity()
@Exclude()
export class Student extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 40)
  @Column('varchar', { length: 40 })
    firstName: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 40)
  @Column('varchar', { length: 40 })
    lastName: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @IsOptional()
  @Length(1, 100)
  @Column({ type: 'varchar', length: 100, nullable: true })
    nickName: string

  @OneToMany(() => Order, (order) => order.student)
    orders: Order[]
}

export interface IStudent extends Student {}
