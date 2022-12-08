import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsInt, IsUUID, Max, Min } from 'class-validator'
import { School } from './school.model'
import { Group } from './group.model'
import { EmployeePosition } from './employee-position.model'
import { Title } from './title.model'
import { Order } from '../store/order.model'

@Entity()
@Exclude()
export class Prom extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Group, (group) => group.proms)
    group: Group

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Title, (title) => title.proms)
    title: Title

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => EmployeePosition, (ep) => ep.proms)
    profesor: EmployeePosition

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => EmployeePosition, (ep) => ep.proms)
    principal: EmployeePosition

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => School, (school) => school.proms)
    school: School

  @IsInt()
  @Max(9999)
  @Min(1900)
  @Column('smallint')
    year: number

  @OneToMany(() => Order, (order) => order.prom)
    orders: Order[]
}

export interface IProm extends Prom {}
