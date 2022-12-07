import { Column, Entity, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS } from '../../core_db'
import { IsInt, Max, Min } from 'class-validator'
import { School } from './school.model'
import { Group } from './group.model'
import { EmployeePosition } from './employee-position.model'
import { Title } from './title.model'

@Entity()
@Exclude()
export class Prom extends BaseModel {
  @ManyToOne(() => Group, (group) => group.proms)
    group: Group

  @ManyToOne(() => Title, (title) => title.proms)
    title: Title

  @ManyToOne(() => EmployeePosition, (ep) => ep.proms)
    profesor: EmployeePosition

  @ManyToOne(() => EmployeePosition, (ep) => ep.proms)
    principal: EmployeePosition

  @ManyToOne(() => School, (school) => school.proms)
    school: School

  @IsInt()
  @Max(9999)
  @Min(1900)
  @Column('smallint')
    year: number
}

export interface IProm extends Prom {}
