import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS } from '../../core_db'
import { IsString, Length } from 'class-validator'
import { Prom } from './prom.model'

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

export interface ITitle extends Title {}
