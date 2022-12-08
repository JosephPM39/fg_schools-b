import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsOptional, IsString, IsUUID, Length, ValidateIf } from 'class-validator'
import { Order } from '../store'
import { Prom } from '../schools'
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

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @ValidateIf(o => !o.prom || o.order)
  @IsUUID()
  @IsOptional()
  @JoinColumn()
  @OneToOne(() => Order, (order) => order.photo, { ...baseRelationOptions, nullable: true })
    order: Order

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @ValidateIf(o => !o.order || o.prom)
  @IsUUID()
  @IsOptional()
  @JoinColumn()
  @OneToOne(() => Prom, (prom) => prom.photo, { ...baseRelationOptions, nullable: true })
    prom: Prom

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  @OneToOne(() => Qr, (qr) => qr.photo)
    qr: Qr

  @OneToMany(() => PhotoProduct, (photoProduct) => photoProduct.product)
    photoProduct: PhotoProduct[]
}

export interface IPhoto extends Photo {}
