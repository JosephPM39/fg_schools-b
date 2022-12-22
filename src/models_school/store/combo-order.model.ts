import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IOrder, Order } from './order.model'
import { Combo, ICombo } from './combo.model'
import { IsUUID, ValidateNested } from 'class-validator'

@Entity()
@Exclude()
export class ComboOrder extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    orderId: IOrder['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    comboId: ICombo['id']

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @OneToOne(() => Order, (order) => order.comboOrder, baseRelationOptions)
  @JoinColumn({ name: 'orderId' })
    order: Order

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Combo, (combo) => combo.comboOrders, baseRelationOptions)
  @JoinColumn({ name: 'comboId' })
    combo: Combo
}

export interface IComboOrder extends ComboOrder {}
