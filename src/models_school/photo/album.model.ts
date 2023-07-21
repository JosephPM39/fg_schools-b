import { Column, Entity, OneToMany } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsString, Length } from 'class-validator'
import { PhotoProduct } from './photo-product.model'
import { GalleryAlbum } from './gallery-album.model'

@Entity()
@Exclude()
export class Album extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 30)
  @Column('varchar', { length: 30 })
    name: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 100)
  @Column('varchar', { length: 100 })
    url: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  // RELATIONS

  @OneToMany(() => GalleryAlbum, (galleryAlbum) => galleryAlbum.album)
    galleriesAlbums: GalleryAlbum[]

  @OneToMany(() => PhotoProduct, (photoProduct) => photoProduct.album)
    photoProduct: PhotoProduct[]
}

export interface IAlbum extends Album {}
