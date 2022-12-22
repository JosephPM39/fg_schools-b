import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsInt, IsUUID, Max, Min, ValidateNested } from 'class-validator'
import { Combo, ICombo } from './combo.model'
import { IProduct, Product } from '../products'

@Entity()
@Exclude()
export class ProductCombo extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    comboId: ICombo['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    productId: IProduct['id']

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

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Combo, (combo) => combo.productCombos, baseRelationOptions)
  @JoinColumn({ name: 'comboId' })
    combo: Combo

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Product, (product) => product.productCombos, baseRelationOptions)
  @JoinColumn({ name: 'productId' })
    product: Product
}

export interface IProductCombo extends ProductCombo {}
