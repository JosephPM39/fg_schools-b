import { Column, Entity, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsString, IsUUID, Length } from 'class-validator'
import { Photo } from './photo.model'
import { Product } from '../products'

@Entity()
@Exclude()
export class PhotoProduct extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 20)
  @Column('varchar', { length: 20 })
    code: string

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Photo, (photo) => photo.photoProduct, baseRelationOptions)
    photo: Photo

  @Expose({ since: EV.UPDATE, until: EV.GET })
  @IsUUID()
  @ManyToOne(() => Product, (product) => product.photoProduct, baseRelationOptions)
    product: Product
}

export interface IPhotoProduct extends PhotoProduct {}
