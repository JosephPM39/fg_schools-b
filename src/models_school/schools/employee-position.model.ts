import { Entity, ManyToOne, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { Employee } from './employee.model'
import { Position } from './position.model'
import { Prom } from './prom.model'
import { IsUUID } from 'class-validator'

@Entity()
@Exclude()
export class EmployeePosition extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Employee, (employee) => employee.employeePositions)
    employee: Employee

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Position, (position) => position.employeePositions)
    position: Position

  @OneToMany(() => Prom, (proms) => proms.group)
    proms: Prom[]
}

export interface IEmployeePosition extends EmployeePosition {}
