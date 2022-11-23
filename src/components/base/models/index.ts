import { IsInt, IsDate, IsOptional } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@Exclude()
export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  @IsInt()
  @Expose()
    id: number;

  @IsOptional()
  @Column()
  @IsDate()
  @Expose()
    createAt: Date;

  @IsOptional()
  @Column()
  @IsDate()
  @Expose()
    updateAt: Date;

  @IsOptional()
  @Column()
  @IsDate()
  @Expose()
    deletedAt: Date;
}

export default { BaseModel };
