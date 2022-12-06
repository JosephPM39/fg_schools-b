import { Expose, Exclude, Type } from 'class-transformer'
import { IsInt, IsOptional, IsIn } from 'class-validator'

@Exclude()
export class Query {
  @Expose()
  @IsInt()
  @Type(() => Number)
  @IsOptional()
    limit: number

  @Expose()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
    offset: number

  @Expose()
  @IsIn(['ASC', 'DESC'])
  @IsOptional()
    order: 'ASC' | 'DESC'
}

export interface IQuery extends Partial<Query> {}
