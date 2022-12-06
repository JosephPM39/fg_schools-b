import { IsDate, IsOptional, IsUUID } from 'class-validator'
import { Expose, Exclude } from 'class-transformer'
import {
  BaseEntity, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm'
import { EXPOSE_VERSIONS } from '../../../core_db'

@Entity()
@Exclude()
export class BaseModel extends BaseEntity {
  @Expose({ since: EXPOSE_VERSIONS.CREATE })
  @IsOptional()
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
    id: string

  @Expose({ since: EXPOSE_VERSIONS.FULL })
  @IsOptional()
  @CreateDateColumn()
  @IsDate()
    createdAt: Date

  @Expose({ since: EXPOSE_VERSIONS.FULL })
  @IsOptional()
  @UpdateDateColumn()
  @IsDate()
    updatedAt: Date

  @Expose({ since: EXPOSE_VERSIONS.FULL })
  @IsOptional()
  @DeleteDateColumn()
  @IsDate()
    deletedAt: Date
}

export default { BaseModel }
