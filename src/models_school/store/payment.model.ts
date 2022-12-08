import { Column, Entity, ManyToOne } from 'typeorm'
import { Exclude, Expose, Type } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsDate, IsNumber, IsOptional, IsString, Length, Max, Min } from 'class-validator'
import { Order } from './order.model'

@Entity()
@Exclude()
export class Payment extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @ManyToOne(() => Order, (order) => order.payments)
    order: Order

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
}

export interface IPayment extends Payment {}
