import { Entity, ManyToOne, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { Employee } from './employee.model'
import { Position } from './position.model'
import { Prom } from './prom.model'
import { IsUUID } from 'class-validator'

@Entity()
@Exclude()
export class EmployeePosition extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Employee, (employee) => employee.employeePositions, baseRelationOptions)
    employee: Employee | string

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Position, (position) => position.employeePositions, baseRelationOptions)
    position: Position | string

  @OneToMany(() => Prom, (proms) => proms.group)
    proms: Prom[]
}

export interface IEmployeePosition extends EmployeePosition {}
