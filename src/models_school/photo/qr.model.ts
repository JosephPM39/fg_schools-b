import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsOptional, IsString, IsUUID, Length, ValidateNested } from 'class-validator'
import { IPhoto, Photo } from './photo.model'

@Entity()
@Exclude()
export class Qr extends BaseModel {
  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 20)
  @Column('varchar', { length: 20, unique: true })
    code: string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsString()
  @Length(1, 100)
  @Column({ type: 'varchar', length: 100, unique: true })
    url: string

  @Expose({ since: EV.UPDATE, until: EV.CREATE_NESTED })
  @IsOptional()
  @IsUUID()
  @Column()
    photoId: IPhoto['id']

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean

  // RELATIONS

  @Expose({ since: EV.CREATE_NESTED, until: EV.DELETE })
  @IsOptional()
  @ValidateNested()
  @OneToOne(() => Photo, (photo) => photo.qr, { ...baseRelationOptions, nullable: true })
  @JoinColumn({ name: 'photoId' })
    photo: Photo
}

export interface IQr extends Qr {}
