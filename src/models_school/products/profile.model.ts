import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsString, IsUUID, Length, ValidateNested } from 'class-validator'
import { IModel, Model } from './model.model'
import { IType, Type } from './type.model'
import { ISize, Size } from './size.model'
import { Color, IColor } from './color.model'
import { Border, IBorder } from './border.model'

@Entity()
@Exclude()
export class Profile extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    modelId: IModel['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    typeId: IType['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    sizeId: ISize['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    colorId: IColor['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    borderId: IBorder['id']

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Model, (model) => model.profiles, baseRelationOptions)
  @JoinColumn({ name: 'modelId' })
    model: Model

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Type, (type) => type.profiles, baseRelationOptions)
  @JoinColumn({ name: 'typeId' })
    type: Type

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Size, (size) => size.profiles, baseRelationOptions)
  @JoinColumn({ name: 'sizeId' })
    size: Size

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Color, (color) => color.profiles, baseRelationOptions)
  @JoinColumn({ name: 'colorId' })
    color: Color

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Border, (border) => border.profiles, baseRelationOptions)
  @JoinColumn({ name: 'borderId' })
    border: Border
}

export interface IProfile extends Profile {}
