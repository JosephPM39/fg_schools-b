import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, EXPOSE_VERSIONS as EV } from '../../base'
import { IsString, Length } from 'class-validator'
import { Prom } from '.'

@Entity()
@Exclude()
export class School extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 100)
  @Column('varchar', { length: 100 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 254)
  @Column('varchar', { length: 254 })
    location: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    code: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 100)
  @Column('varchar', { length: 100 })
    icon: string

  @OneToMany(() => Prom, (proms) => proms.group)
    proms: Prom[]
}

export interface ISchool extends School {}
export interface ISchoolCreate extends Required<Pick<ISchool, 'name' | 'location' | 'code' | 'icon'>> {}
export interface ISchoolUpdate extends Partial<ISchoolCreate> {}
export interface ISchoolGet extends Pick<ISchool, 'id'> {}
