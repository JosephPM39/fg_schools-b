import { Column, Entity, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsString, IsUUID, Length } from 'class-validator'
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

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Model, (model) => model.profiles, baseRelationOptions)
    model: Model | string

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Type, (type) => type.profiles, baseRelationOptions)
    type: Type | string

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Size, (size) => size.profiles, baseRelationOptions)
    size: Size | string

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Color, (color) => color.profiles, baseRelationOptions)
    color: Color | string

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Border, (border) => border.profiles, baseRelationOptions)
    border: Border | string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean
}

export interface IProfile extends Profile {}
