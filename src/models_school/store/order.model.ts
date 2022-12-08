import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsNumber, IsOptional, IsString, IsUUID, Length, Max, Min } from 'class-validator'
import { ComboOrder } from './combo-order.model'
import { ProductOrder } from './product-order.model'
import { Payment } from './payment.model'
import { Student } from './student.model'
import { Prom } from '../schools'

@Entity()
@Exclude()
export class Order extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Student, (student) => student.orders)
    student: Student

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @ManyToOne(() => Prom, (prom) => prom.orders)
    prom: Prom

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsNumber()
  @Max(9999.99)
  @Min(0.01)
  @Column('real')
    total: number

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsNumber()
  @Max(9999.99)
  @Min(0.01)
  @Column('real')
    remaining: number

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsOptional()
  @IsString()
  @Length(1, 254)
  @Column('varchar', { length: 254 })
    details: string

  @OneToOne(() => ComboOrder, (comboOrder) => comboOrder.order)
    comboOrder: ComboOrder

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
    productOrders: ProductOrder[]

  @OneToMany(() => Payment, (payment) => payment.order)
    payments: Payment[]
}

export interface IOrder extends Order {}
