import { IsDate, IsOptional, IsUUID } from 'class-validator'
import { Expose, Exclude, Type } from 'class-transformer'
import {
  BaseEntity, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, RelationOptions, UpdateDateColumn
} from 'typeorm'
import { EXPOSE_VERSIONS } from '../core_db'

export const baseRelationOptions: RelationOptions = {
  cascade: ['insert', 'update', 'soft-remove', 'recover'],
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE',
  nullable: false
}

@Entity()
@Exclude()
export class BaseModel extends BaseEntity {
  @Expose({ since: EXPOSE_VERSIONS.CREATE })
  @IsOptional()
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
    id: string

  @Expose({ since: EXPOSE_VERSIONS.FULL })
  @Type(() => Date)
  @IsOptional()
  @CreateDateColumn()
  @IsDate()
    createdAt: Date

  @Expose({ since: EXPOSE_VERSIONS.FULL })
  @Type(() => Date)
  @IsOptional()
  @UpdateDateColumn()
  @IsDate()
    updatedAt: Date

  @Expose({ since: EXPOSE_VERSIONS.FULL })
  @Type(() => Date)
  @IsOptional()
  @DeleteDateColumn()
  @IsDate()
    deletedAt: Date
}

export interface IBaseModel extends BaseModel {}
