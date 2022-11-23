import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { BaseModel } from '../../';

@Entity()
export class GroupModel extends BaseModel {
  @Column('varchar', { length: 30})
  name: string;
  @OneToMany(() => PromModel, (proms) => proms.group)
  proms: PromModel[]
}

@Entity()
export class TitleModel extends BaseModel {
  @Column('varchar', { length: 100})
  name: string;
  @OneToMany(() => PromModel, (proms) => proms.group)
  proms: PromModel[]
}

@Entity()
export class SchoolModel extends BaseModel {
  @Column('varchar', {length: 100})
  name: string
  @Column('varchar', {length: 254})
  location: string
  @Column('varchar', {length: 30})
  code: string
  @Column('varchar', {length: 100})
  icon: string
  @OneToMany(() => PromModel, (proms) => proms.group)
  proms: PromModel[]
}

@Entity()
export class PositionModel extends BaseModel {
  @Column('varchar', { length: 30})
  name: string;

  @OneToMany(() => EmployeePositionModel, (ep) => ep.position)
  employeePositions: EmployeePositionModel[];
}

@Entity()
export class EmployeeModel extends BaseModel {
  @Column('varchar', {length: 40})
  firstName: string

  @Column('varchar', {length: 40})
  lastName: string

  @Column('varchar', {length: 10})
  profesion: string

  @Column('varchar', {length: 55})
  contact: string

  @OneToMany(() => EmployeePositionModel, (ep) => ep.employee)
  employeePositions: EmployeePositionModel[];
}

@Entity()
export class EmployeePositionModel extends BaseModel {
  @ManyToOne(() => EmployeeModel, (employee) => employee.employeePositions)
  employee: EmployeeModel

  @ManyToOne(() => PositionModel, (position) => position.employeePositions)
  position: PositionModel
 @OneToMany(() => PromModel, (proms) => proms.group)
  proms: PromModel[]

}

@Entity()
export class PromModel extends BaseModel {
  @ManyToOne(() => GroupModel, (group) => group.proms)
  group: GroupModel
  @ManyToOne(() => TitleModel, (title) => title.proms)
  title: TitleModel
  @ManyToOne(() => EmployeePositionModel, (ep) => ep.proms)
  profesor: EmployeePositionModel
  @ManyToOne(() => EmployeePositionModel, (ep) => ep.proms)
  principal: EmployeePositionModel
  @ManyToOne(() => SchoolModel, (school) => school.proms)
  school: SchoolModel
  @Column('date')
  year: Date
}
