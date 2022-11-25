import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, EXPOSE_VERSIONS } from '../../base'
import { IsInt, IsString, Length, Max, Min } from 'class-validator'
import { School } from './school.model'

@Entity()
@Exclude()
export class Group extends BaseModel {
  @Expose({
    since: EXPOSE_VERSIONS.UPDATE,
    until: EXPOSE_VERSIONS.GET
  })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @OneToMany(() => Prom, (proms) => proms.group)
    proms: Prom[]
}

@Entity()
@Exclude()
export class Title extends BaseModel {
  @Expose({
    since: EXPOSE_VERSIONS.UPDATE,
    until: EXPOSE_VERSIONS.GET
  })
  @IsString()
  @Length(1, 100)
  @Column('varchar', { length: 100 })
    name: string

  @OneToMany(() => Prom, (proms) => proms.group)
    proms: Prom[]
}

@Entity()
@Exclude()
export class Position extends BaseModel {
  @Expose({
    since: EXPOSE_VERSIONS.UPDATE,
    until: EXPOSE_VERSIONS.GET
  })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @OneToMany(() => EmployeePosition, (ep) => ep.position)
    employeePositions: EmployeePosition[]
}

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

@Entity()
@Exclude()
export class EmployeePosition extends BaseModel {
  @ManyToOne(() => Employee, (employee) => employee.employeePositions)
    employee: Employee

  @ManyToOne(() => Position, (position) => position.employeePositions)
    position: Position

  @OneToMany(() => Prom, (proms) => proms.group)
    proms: Prom[]
}

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
