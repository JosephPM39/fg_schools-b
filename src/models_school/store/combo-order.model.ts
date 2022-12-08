import { Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { Order } from './order.model'
import { Combo } from './combo.model'
import { IsUUID } from 'class-validator'

@Entity()
@Exclude()
export class ComboOrder extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @JoinColumn()
  @OneToOne(() => Order, (order) => order.comboOrder, baseRelationOptions)
    order: Order

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Combo, (combo) => combo.comboOrders, baseRelationOptions)
    combo: Combo
}

export interface IComboOrder extends ComboOrder {}
