import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsOptional, IsUUID, ValidateNested } from 'class-validator'
import { IOrder, Order } from '../store'
import { Qr } from './qr.model'
import { ISectionProm, SectionProm } from '../schools/section-prom.model'
import { GalleryAlbum } from './gallery-album.model'

@Entity()
@Exclude()
export class Gallery extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsOptional()
  @IsUUID()
  @Column()
    orderId: IOrder['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsOptional()
  @IsUUID()
  @Column()
    sectionPromId: ISectionProm['id']

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @IsOptional()
  @ValidateNested()
  @OneToOne(() => Order, (order) => order.gallery, { ...baseRelationOptions, nullable: true })
  @JoinColumn({ name: 'orderId' })
    order: Order

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @IsOptional()
  @ValidateNested()
  @OneToOne(() => SectionProm, (sectionProm) => sectionProm.gallery, { ...baseRelationOptions, nullable: true })
  @JoinColumn({ name: 'sectionPromId' })
    sectionProm: SectionProm

  @OneToOne(() => Qr, (qr) => qr.gallery)
    qr: Qr

  @OneToMany(() => GalleryAlbum, (galleryAlbum) => galleryAlbum.gallery)
    galleriesAlbums: GalleryAlbum[]
}

export interface IGallery extends Gallery {}
