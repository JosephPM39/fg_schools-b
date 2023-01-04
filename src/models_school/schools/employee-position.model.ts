import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { Employee, IEmployee } from './employee.model'
import { IPosition, Position } from './position.model'
import { IsUUID, ValidateNested } from 'class-validator'
import { SectionProm } from './section-prom.model'
import { SchoolProm } from './school-prom.model'

@Entity()
@Exclude()
export class EmployeePosition extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    employeeId: IEmployee['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    positionId: IPosition['id']

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Employee, (employee) => employee.employeePositions, baseRelationOptions)
  @JoinColumn({ name: 'employeeId' })
    employee: Employee

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Position, (position) => position.employeePositions, baseRelationOptions)
  @JoinColumn({ name: 'positionId' })
    position: Position

  @OneToMany(() => SectionProm, (sectionProm) => sectionProm.profesor)
    sectionsProms: SectionProm[]

  @OneToMany(() => SchoolProm, (schoolProm) => schoolProm.principal)
    schoolsProms: SchoolProm[]
}

export interface IEmployeePosition extends EmployeePosition {}
