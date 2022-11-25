import { IsInt, IsDate, IsOptional } from 'class-validator'
import { Expose, Exclude } from 'class-transformer'
import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn
} from 'typeorm'
import { EXPOSE_VERSIONS } from '../types'

@Entity()
@Exclude()
export class BaseModel extends BaseEntity {
  @Expose({ since: EXPOSE_VERSIONS.CREATE })
  @PrimaryGeneratedColumn()
  @IsInt()
    id: number

  @Expose({ since: EXPOSE_VERSIONS.FULL })
  @IsOptional()
  @Column()
  @IsDate()
    createAt: Date

  @Expose({ since: EXPOSE_VERSIONS.FULL })
  @IsOptional()
  @Column()
  @IsDate()
    updateAt: Date

  @Expose({ since: EXPOSE_VERSIONS.FULL })
  @IsOptional()
  @Column()
  @IsDate()
    deletedAt: Date
}

export default { BaseModel }
