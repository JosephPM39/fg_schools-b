import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Exclude, Expose, Type } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsDate, IsNumber, IsOptional, IsString, IsUUID, Length, Max, Min, ValidateNested } from 'class-validator'
import { IOrder, Order } from './order.model'

@Entity()
@Exclude()
export class Payment extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    orderId: IOrder['id']

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsNumber()
  @Max(9999.99)
  @Min(0.01)
  @Column('real')
    total: number

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 254)
  @Column('varchar', { length: 254 })
    details: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @Column({ type: 'timestamp without time zone', default: () => 'CURRENT_TIMESTAMP' })
    date: Date

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Order, (order) => order.payments, baseRelationOptions)
  @JoinColumn({ name: 'orderId' })
    order: Order
}

export interface IPayment extends Payment {}
