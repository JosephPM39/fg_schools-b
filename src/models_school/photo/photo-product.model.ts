import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsString, IsUUID, Length, ValidateNested } from 'class-validator'
import { IPhoto, Photo } from './photo.model'
import { IProduct, Product } from '../products'

@Entity()
@Exclude()
export class PhotoProduct extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 20)
  @Column('varchar', { length: 20 })
    code: string

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    photoId: IPhoto['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    productId: IProduct['id']

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Photo, (photo) => photo.photoProduct, baseRelationOptions)
  @JoinColumn({ name: 'photoId' })
    photo: Photo

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Product, (product) => product.photoProduct, baseRelationOptions)
  @JoinColumn({ name: 'productId' })
    product: Product
}

export interface IPhotoProduct extends PhotoProduct {}
