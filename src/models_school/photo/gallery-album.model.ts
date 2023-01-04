import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsUUID, ValidateNested } from 'class-validator'
import { Gallery, IGallery } from './gallery.model'
import { Album, IAlbum } from './album.model'

@Entity()
@Exclude()
export class GalleryAlbum extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    galleryId: IGallery['id']

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsUUID()
  @Column()
    albumId: IAlbum['id']

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Gallery, (gallery) => gallery.galleriesAlbums, baseRelationOptions)
  @JoinColumn({ name: 'galleryId' })
    gallery: Gallery

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @ValidateNested()
  @ManyToOne(() => Album, (album) => album.galleriesAlbums, baseRelationOptions)
  @JoinColumn({ name: 'albumId' })
    album: Album
}

export interface IGalleryAlbum extends GalleryAlbum {}
