import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsString, Length } from 'class-validator'
import { Model } from './model.model'
import { Type } from './type.model'
import { Size } from './size.model'
import { Color } from './color.model'
import { Border } from './border.model'

@Entity()
@Exclude()
export class Profile extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @ManyToOne(() => Model, (model) => model.profiles)
    model: Model

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @ManyToOne(() => Type, (type) => type.profiles)
    type: Type

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @ManyToOne(() => Size, (size) => size.profiles)
    size: Size

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @ManyToOne(() => Color, (color) => color.profiles)
    color: Color

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @ManyToOne(() => Border, (border) => border.profiles)
    border: Border

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean
}

export interface IProfile extends Profile {}
