import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsOptional, IsString, IsUUID, Length, ValidateNested } from 'class-validator'
import { IOrder, Order } from '../store'
import { IProm, Prom } from '../schools'
import { Qr } from './qr.model'
import { PhotoProduct } from './photo-product.model'

@Entity()
@Exclude()
export class Photo extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 20)
  @Column('varchar', { length: 20 })
    startCode: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 20)
  @Column('varchar', { length: 20 })
    endCode: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 100)
  @Column({ type: 'varchar', length: 100 })
    studentPhotos: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 100)
  @Column({ type: 'varchar', length: 100 })
    sectionPhotos: string

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsOptional()
  @IsUUID()
  @Column()
    orderId: IOrder['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsOptional()
  @IsUUID()
  @Column()
    promId: IProm['id']

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @IsOptional()
  @ValidateNested()
  @OneToOne(() => Order, (order) => order.photo, { ...baseRelationOptions, nullable: true })
  @JoinColumn({ name: 'orderId' })
    order: Order

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @IsOptional()
  @ValidateNested()
  @OneToOne(() => Prom, (prom) => prom.photo, { ...baseRelationOptions, nullable: true })
  @JoinColumn({ name: 'promId' })
    prom: Prom

  @OneToOne(() => Qr, (qr) => qr.photo)
    qr: Qr

  @OneToMany(() => PhotoProduct, (photoProduct) => photoProduct.product)
    photoProduct: PhotoProduct[]
}

export interface IPhoto extends Photo {}
