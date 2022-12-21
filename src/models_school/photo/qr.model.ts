import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'
import { BaseModel, baseRelationOptions } from '../base.model'
import { EXPOSE_VERSIONS as EV } from '../../core_db'
import { IsBoolean, IsOptional, IsString, IsUUID, Length } from 'class-validator'
import { Photo } from './photo.model'

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

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsUUID()
  @IsOptional()
  @JoinColumn()
  @OneToOne(() => Photo, (photo) => photo.qr, { ...baseRelationOptions, nullable: true })
    photo: Photo | string

  @Expose({ since: EV.UPDATE, until: EV.DELETE })
  @IsBoolean()
  @Column('boolean')
    available: boolean
}

export interface IQr extends Qr {}
