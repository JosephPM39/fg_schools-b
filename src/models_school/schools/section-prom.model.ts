import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsUUID, ValidateIf, ValidateNested } from 'class-validator'
import { Group, IGroup } from './group.model'
import { EmployeePosition, IEmployeePosition } from './employee-position.model'
import { ITitle, Title } from './title.model'
import { Order } from '../store/order.model'
import { ISchoolProm, SchoolProm } from './school-prom.model'
import { Gallery } from '../photo'

@Entity()
@Exclude()
export class SectionProm extends BaseModel {
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
    schoolPromId: ISchoolProm['id']

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateIf(o => !o.groupId)
  @ValidateNested()
  @ManyToOne(() => Group, (group) => group.sectionsProms, baseRelationOptions)
  @JoinColumn({ name: 'groupId' })
    group: Group

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateIf(o => !o.titleId)
  @ValidateNested()
  @ManyToOne(() => Title, (title) => title.sectionsProms, baseRelationOptions)
  @JoinColumn({ name: 'titleId' })
    title: Title

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateIf(o => !o.profesorId)
  @ValidateNested()
  @ManyToOne(() => EmployeePosition, (ep) => ep.sectionsProms, baseRelationOptions)
  @JoinColumn({ name: 'profesorId' })
    profesor: EmployeePosition

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateIf(o => !o.schoolId)
  @ValidateNested()
  @ManyToOne(() => SchoolProm, (schoolProm) => schoolProm.sectionsProms, baseRelationOptions)
  @JoinColumn({ name: 'schoolPromId' })
    schoolProm: SchoolProm

  @OneToMany(() => Order, (order) => order.sectionProm)
    orders: Order[]

  @OneToOne(() => Gallery, (gallery) => gallery.sectionProm)
    gallery: Gallery
}

export interface ISectionProm extends SectionProm {}
