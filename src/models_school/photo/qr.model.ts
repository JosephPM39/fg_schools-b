import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsOptional, IsString, IsUUID, Length, ValidateNested } from 'class-validator'
import { Gallery, IGallery } from './gallery.model'

@Entity()
@Exclude()
export class Qr extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @Column({ type: 'uuid', unique: true })
    code: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 255)
  @Column({ type: 'varchar', length: 255, unique: true })
    url: string

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsOptional()
  @IsUUID()
  @Column()
    galleryId: IGallery['id']

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @IsOptional()
  @ValidateNested()
  @OneToOne(() => Gallery, (gallery) => gallery.qr, { ...baseRelationOptions, nullable: true })
  @JoinColumn({ name: 'galleryId' })
    gallery: Gallery
}

export interface IQr extends Qr {}
