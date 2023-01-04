import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsString, Length } from 'class-validator'
import { SchoolProm } from './school-prom.model'

@Entity()
@Exclude()
export class School extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsString()
  @Length(1, 100)
  @Column('varchar', { length: 100 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsString()
  @Length(1, 254)
  @Column('varchar', { length: 254 })
    location: string

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    code: string

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsString()
  @Length(1, 100)
  @Column('varchar', { length: 100 })
    icon: string

  // RELATIONS

  @OneToMany(() => SchoolProm, (schoolProm) => schoolProm.school)
    schoolsProms: SchoolProm[]
}

export interface ISchool extends School {}
