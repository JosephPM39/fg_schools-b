import { Expose, Exclude, Type } from 'class-transformer'
import { IsInt, IsOptional, IsIn } from 'class-validator'
import { IsIntOrIn } from './custom-decorators'

export enum ByOperator {
  equal = 'EQUAL',
  notEqual = 'NOT_EQUAL',
  lessThan = 'LESS_THAN',
  moreThan = 'MORE_THAN',
  like = 'LIKE',
  iLike = 'ILIKE'
}

const byOperator = [
  ByOperator.equal,
  ByOperator.notEqual,
  ByOperator.lessThan,
  ByOperator.moreThan,
  ByOperator.like,
  ByOperator.iLike
]

export enum Order {
  desc = 'DESC',
  asc = 'ASC'
}

const order = [
  Order.desc,
  Order.asc
]

export enum FileName {
  autoUuid = 'AUTO_UUID',
  keepClientVersion = 'KEEP_CLIENT_VERSION'
}

const fileName = [
  FileName.autoUuid,
  FileName.keepClientVersion
]

@Exclude()
export class Query {
  @Expose()
  @IsOptional()
  @IsIntOrIn('limit', ['NONE'])
    limit: number | 'NONE'

  @Expose()
  @Type(() => String)
  @IsOptional()
  @IsIn(byOperator)
    byoperator: ByOperator

  @Expose()
  @Type(() => Number)
  @IsInt()
  @IsOptional()
    offset: number

  @Expose()
  @Type(() => String)
  @IsIn(order)
  @IsOptional()
    order: Order

  @Expose()
  @IsOptional()
  @IsIn(fileName)
    filename: FileName

  @Expose()
  @IsOptional()
  @IsInt()
    imgwidth: number

  @Expose()
  @IsOptional()
  @IsInt()
    imgheight: number
}

export interface IQuery extends Partial<Query> {}
