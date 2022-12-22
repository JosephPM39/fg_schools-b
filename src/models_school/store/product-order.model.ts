import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsInt, IsUUID, Max, Min, ValidateNested } from 'class-validator'
import { IProduct, Product } from '../products'
import { IOrder, Order } from './order.model'

@Entity()
@Exclude()
export class ProductOrder extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    orderId: IOrder['id']

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
  @ManyToOne(() => Order, (order) => order.productOrders, baseRelationOptions)
  @JoinColumn({ name: 'orderId' })
    order: Order

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Product, (product) => product.productOrders, baseRelationOptions)
  @JoinColumn({ name: 'productId' })
    product: Product
}

export interface IProductOrder extends ProductOrder {}
