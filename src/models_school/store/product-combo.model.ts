import { Column, Entity, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsInt, IsUUID, Max, Min } from 'class-validator'
import { Combo } from './combo.model'
import { Product } from '../products'

@Entity()
@Exclude()
export class ProductCombo extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Combo, (combo) => combo.productCombos, baseRelationOptions)
    combo: Combo

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Product, (product) => product.productCombos, baseRelationOptions)
    product: Product

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsInt()
  @Max(9999)
  @Min(1)
  @Column('smallint')
    amount: number

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    inOffer: boolean
}

export interface IProductCombo extends ProductCombo {}
