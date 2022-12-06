import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../../base'
import { EXPOSE_VERSIONS as EV } from '../../../core_db'
import { IsString, Length } from 'class-validator'
import { Prom } from '.'

@Entity()
@Exclude()
export class Group extends BaseModel {
  @Expose({
    since: EV.UPDATE, until: EV.DELETE
  })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @OneToMany(() => Prom, (proms) => proms.group)
    proms: Prom[]
}

export interface IGroup extends Group {}
