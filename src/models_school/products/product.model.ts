import { Column, Entity, ManyToOne } from 'typeorm'
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
export class Product extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @ManyToOne(() => Model, (model) => model.products, { nullable: true })
    model: Model

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @ManyToOne(() => Type, (type) => type.products, { nullable: true })
    type: Type

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @ManyToOne(() => Size, (size) => size.products, { nullable: true })
    size: Size

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @ManyToOne(() => Color, (color) => color.products, { nullable: true })
    color: Color

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @ManyToOne(() => Border, (border) => border.products, { nullable: true })
    border: Border

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean
}

export interface IProduct extends Product {}
