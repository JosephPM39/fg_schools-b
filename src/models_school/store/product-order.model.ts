import { Column, Entity, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsInt, IsUUID, Max, Min } from 'class-validator'
import { Product } from '../products'
import { Order } from './order.model'

@Entity()
@Exclude()
export class ProductOrder extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Order, (order) => order.productOrders, baseRelationOptions)
    order: Order | string

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Product, (product) => product.productOrders, baseRelationOptions)
    product: Product | string

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

export interface IProductOrder extends ProductOrder {}
