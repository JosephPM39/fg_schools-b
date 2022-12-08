import { Entity, ManyToOne, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { Order } from './order.model'
import { Combo } from './combo.model'
import { IsUUID } from 'class-validator'

@Entity()
@Exclude()
export class ComboOrder extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @OneToOne(() => Order, (order) => order.comboOrder)
    order: Order

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Combo, (combo) => combo.comboOrders)
    combo: Combo
}

export interface IComboOrder extends ComboOrder {}
