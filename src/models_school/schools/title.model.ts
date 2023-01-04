import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsString, Length } from 'class-validator'
import { SectionProm } from './section-prom.model'

@Entity()
@Exclude()
export class Title extends BaseModel {
  @Expose({
    since: EV.UPDATE,
    until: EV.CREATE_NESTED
  })
  @IsString()
  @Length(1, 100)
  @Column('varchar', { length: 100 })
    name: string

  // RELATIONS

  @OneToMany(() => SectionProm, (sectionProm) => sectionProm.title)
    sectionsProms: SectionProm[]
}

export interface ITitle extends Title {}
