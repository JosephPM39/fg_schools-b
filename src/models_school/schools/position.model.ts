import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsIn, IsString, Length } from 'class-validator'
import { EmployeePosition } from './employee-position.model'

export enum PositionType {
  PRINCIPAL = 'Dirección',
  PROFESOR = 'Docencia'
}

export const positionTypes = [PositionType.PROFESOR, PositionType.PRINCIPAL]

@Entity()
@Exclude()
export class Position extends BaseModel {
  @Expose({
    since: EV.UPDATE,
    until: EV.CREATE_NESTED
  })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @Expose({
    since: EV.UPDATE,
    until: EV.CREATE_NESTED
  })
  @IsIn(positionTypes)
  @Column({ type: 'enum', enum: PositionType })
    type: PositionType

  // RELATIONS

  @OneToMany(() => EmployeePosition, (ep) => ep.position)
    employeePositions: EmployeePosition[]
}

export interface IPosition extends Position {}
