import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsInt, IsUUID, Max, Min, ValidateIf, ValidateNested } from 'class-validator'
import { ISchool, School } from './school.model'
import { Group, IGroup } from './group.model'
import { EmployeePosition, IEmployeePosition } from './employee-position.model'
import { ITitle, Title } from './title.model'
import { Order } from '../store/order.model'
import { Photo } from '../photo/photo.model'

@Entity()
@Exclude()
export class Prom extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    groupId: IGroup['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    titleId: ITitle['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    profesorId: IEmployeePosition['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    principalId: IEmployeePosition['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    schoolId: ISchool['id']

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsInt()
  @Max(9999)
  @Min(1900)
  @Column('smallint')
    year: number

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateIf(o => !o.groupId)
  @ValidateNested()
  @ManyToOne(() => Group, (group) => group.proms, baseRelationOptions)
  @JoinColumn({ name: 'groupId' })
    group: Group

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateIf(o => !o.titleId)
  @ValidateNested()
  @ManyToOne(() => Title, (title) => title.proms, baseRelationOptions)
  @JoinColumn({ name: 'titleId' })
    title: Title

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateIf(o => !o.profesorId)
  @ValidateNested()
  @ManyToOne(() => EmployeePosition, (ep) => ep.proms, baseRelationOptions)
  @JoinColumn({ name: 'profesorId' })
    profesor: EmployeePosition

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateIf(o => !o.principalId)
  @ValidateNested()
  @ManyToOne(() => EmployeePosition, (ep) => ep.proms, baseRelationOptions)
  @JoinColumn({ name: 'principalId' })
    principal: EmployeePosition

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateIf(o => !o.schoolId)
  @ValidateNested()
  @ManyToOne(() => School, (school) => school.proms, baseRelationOptions)
  @JoinColumn({ name: 'schoolId' })
    school: School

  @OneToMany(() => Order, (order) => order.prom)
    orders: Order[]

  @OneToOne(() => Photo, (photo) => photo.prom)
    photo: Photo
}

export interface IProm extends Prom {}
