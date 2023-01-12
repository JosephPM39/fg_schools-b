import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsIn, IsNumber, IsOptional, IsString, IsUUID, Length, Max, Min, ValidateNested } from 'class-validator'
import { ComboOrder } from './combo-order.model'
import { ProductOrder } from './product-order.model'
import { Payment } from './payment.model'
import { IStudent, Student } from './student.model'
import { SectionProm, ISectionProm } from '../schools/section-prom.model'
import { Gallery } from '../photo'

export enum OrderType {
  STUDIO = 'Studio',
  SCHOOL = 'Escuela'
}

export const orderTypes = [OrderType.SCHOOL, OrderType.STUDIO]

@Entity()
@Exclude()
export class Order extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    studentId: IStudent['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    sectionPromId: ISectionProm['id']

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

  @Expose()
  @IsIn(orderTypes)
  @Column({ type: 'enum', enum: OrderType })
    type: OrderType

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Student, (student) => student.orders, baseRelationOptions)
  @JoinColumn({ name: 'studentId' })
    student: Student

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => SectionProm, (sectionProm) => sectionProm.orders, baseRelationOptions)
  @JoinColumn({ name: 'sectionPromId' })
    sectionProm: SectionProm

  @OneToOne(() => ComboOrder, (comboOrder) => comboOrder.order)
    comboOrder: ComboOrder

  @OneToMany(() => ProductOrder, (productOrder) => productOrder.order)
    productOrders: ProductOrder[]

  @OneToMany(() => Payment, (payment) => payment.order)
    payments: Payment[]

  @OneToOne(() => Gallery, (gallery) => gallery.order)
    gallery: Gallery
}

export interface IOrder extends Order {}
