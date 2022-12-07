import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS } from '../../core_db'
import { IsString, Length } from 'class-validator'
import { EmployeePosition } from './employee-position.model'

@Entity()
@Exclude()
export class Employee extends BaseModel {
  @Expose({
    since: EXPOSE_VERSIONS.UPDATE,
    until: EXPOSE_VERSIONS.GET
  })
  @IsString()
  @Length(1, 40)
  @Column('varchar', { length: 40 })
    firstName: string

  @Expose({
    since: EXPOSE_VERSIONS.UPDATE,
    until: EXPOSE_VERSIONS.GET
  })
  @IsString()
  @Length(1, 40)
  @Column('varchar', { length: 40 })
    lastName: string

  @Expose({
    since: EXPOSE_VERSIONS.UPDATE,
    until: EXPOSE_VERSIONS.GET
  })
  @IsString()
  @Length(1, 10)
  @Column('varchar', { length: 10 })
    profesion: string

  @Expose({
    since: EXPOSE_VERSIONS.UPDATE,
    until: EXPOSE_VERSIONS.GET
  })
  @IsString()
  @Length(1, 55)
  @Column('varchar', { length: 55 })
    contact: string

  @OneToMany(() => EmployeePosition, (ep) => ep.employee)
    employeePositions: EmployeePosition[]
}

export interface IEmployee extends Employee {}
