import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsString, Length } from 'class-validator'
import { EmployeePosition } from './employee-position.model'

@Entity()
@Exclude()
export class Position extends BaseModel {
  @Expose({
    since: EV.UPDATE,
    until: EV.DELETE
  })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @OneToMany(() => EmployeePosition, (ep) => ep.position)
    employeePositions: EmployeePosition[]
}

export interface IPosition extends Position {}
