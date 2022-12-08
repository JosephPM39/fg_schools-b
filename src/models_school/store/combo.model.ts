import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsString, Length } from 'class-validator'
import { ComboOrder } from './combo-order.model'
import { ProductCombo } from './product-combo.model'

@Entity()
@Exclude()
export class Combo extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  @OneToOne(() => ComboOrder, (comboOrder) => comboOrder.combo)
    comboOrders: ComboOrder[]

  @OneToMany(() => ProductCombo, (productCombo) => productCombo.combo)
    productCombos: ProductCombo[]
}

export interface ICombo extends Combo {}
