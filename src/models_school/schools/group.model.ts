import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsString, Length } from 'class-validator'
import { Prom } from './prom.model'

@Entity()
@Exclude()
export class Group extends BaseModel {
  @Expose({
    since: EV.UPDATE, until: EV.CREATE_NESTED
  })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  // RELATIONS

  @OneToMany(() => Prom, (proms) => proms.group)
    proms: Prom[]
}

export interface IGroup extends Group {}
