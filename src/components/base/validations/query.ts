import { IsInt, IsOptional, IsIn } from 'class-validator'
export class Query {
  @IsInt()
  @IsOptional()
    limit: number

  @IsInt()
  @IsOptional()
    offset: number

  @IsIn(['ASC', 'DESC'])
  @IsOptional()
    order: 'ASC' | 'DESC'
}

export interface IQuery extends Partial<Query> {}
