import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsInt, IsUUID, Max, Min } from 'class-validator'
import { School } from './school.model'
import { Group } from './group.model'
import { EmployeePosition } from './employee-position.model'
import { Title } from './title.model'
import { Order } from '../store/order.model'
import { Photo } from '../photo/photo.model'

@Entity()
@Exclude()
export class Prom extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Group, (group) => group.proms, baseRelationOptions)
    group: Group

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Title, (title) => title.proms, baseRelationOptions)
    title: Title

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => EmployeePosition, (ep) => ep.proms, baseRelationOptions)
    profesor: EmployeePosition

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => EmployeePosition, (ep) => ep.proms, baseRelationOptions)
    principal: EmployeePosition

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => School, (school) => school.proms, baseRelationOptions)
    school: School

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsInt()
  @Max(9999)
  @Min(1900)
  @Column('smallint')
    year: number

  @OneToMany(() => Order, (order) => order.prom)
    orders: Order[]

  @OneToOne(() => Photo, (photo) => photo.prom)
    photo: Photo
}

export interface IProm extends Prom {}
