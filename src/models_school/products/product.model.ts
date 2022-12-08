import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsString, IsUUID, Length } from 'class-validator'
import { Model } from './model.model'
import { Type } from './type.model'
import { Size } from './size.model'
import { Color } from './color.model'
import { Border } from './border.model'
import { ProductOrder } from '../store/product-order.model'
import { ProductCombo } from '../store/product-combo.model'
import { PhotoProduct } from '../photo/photo-product.model'

@Entity()
@Exclude()
export class Product extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Model, (model) => model.products, { ...baseRelationOptions, nullable: true })
    model: Model

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Type, (type) => type.products, { ...baseRelationOptions, nullable: true })
    type: Type

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Size, (size) => size.products, { ...baseRelationOptions, nullable: true })
    size: Size

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Color, (color) => color.products, { ...baseRelationOptions, nullable: true })
    color: Color

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Border, (border) => border.products, { ...baseRelationOptions, nullable: true })
    border: Border

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.product)
    productOrders: ProductOrder[]

  @OneToMany(() => ProductCombo, (productCombo) => productCombo.product)
    productCombos: ProductCombo[]

  @OneToMany(() => PhotoProduct, (photoProduct) => photoProduct.product)
    photoProduct: PhotoProduct[]
}

export interface IProduct extends Product {}
