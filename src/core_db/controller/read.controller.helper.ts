import { isNumber, isString } from 'class-validator'
import { FindManyOptions, Not, LessThan, MoreThan, Like, ILike } from 'typeorm'
import { IBaseModel } from '../../models_school/base.model'
import { WithRequired } from '../../test/fakers/types'
import { EXPOSE_VERSIONS as EV, IdBy, ModelClassType } from '../types'
import { validateIdBy, validateQuery } from '../validations'
import { ByOperator, IQuery, Order } from '../validations/query'

export const addslashes = (str: string) => {
  //  discuss at: https://locutus.io/php/addslashes/
  // original by: Kevin van Zonneveld (https://kvz.io)
  // improved by: Ates Goral (https://magnetiq.com)
  // improved by: marrtins
  // improved by: Nate
  // improved by: Onno Marsman (https://twitter.com/onnomarsman)
  // improved by: Brett Zamir (https://brett-zamir.me)
  // improved by: Oskar Larsson Högfeldt (https://oskar-lh.name/)
  //    input by: Denny Wardhana
  //   example 1: addslashes("kevin's birthday")
  //   returns 1: "kevin\\'s birthday"
  return (str + '')
    .replace(/[\\"']/g, '\\$&')
    .replace(/\u0000/g, '\\0')
}

const determineWhere = ({ query, idBy }: { query?: Partial<IQuery>, idBy: IdBy }): {
  idBy: IdBy
  operator: ByOperator
} => {
  const helper = ({ type, cb, k }: { cb: Function, type?: 'string' | 'number' | 'any', k: string }) => {
    const v: any = idBy[k as keyof typeof idBy]
    if (type === 'string' && isString(v)) {
      return { [k]: cb(addslashes(v)) }
    }
    if (type === 'number' && isNumber(v)) {
      return { [k]: cb(v) }
    }
    if (type === 'any') {
      return { [k]: cb(v) }
    }
    return { [k]: v }
  }

  const applyOperator = ({ cb, type, query }: { cb: Function, type?: 'string' | 'number' | 'any', query: WithRequired<IQuery, 'byoperator'> }): {
    idBy: {}
    operator: ByOperator
  } => {
    const keys = Object.keys(idBy)
    const newValues = keys.map((k) => helper({ type, cb, k }))
    return {
      idBy: newValues.reduce((p, c) => ({ ...p, ...c }), {}),
      operator: query.byoperator
    }
  }

  const queryWithOp: WithRequired<IQuery, 'byoperator'> = {
    ...query ?? {},
    byoperator: query?.byoperator ?? ByOperator.equal
  }

  if (query?.byoperator === ByOperator.notEqual) {
    return applyOperator({ cb: Not, type: 'any', query: queryWithOp })
  }
  if (query?.byoperator === ByOperator.lessThan) {
    return applyOperator({ cb: LessThan, type: 'number', query: queryWithOp })
  }
  if (query?.byoperator === ByOperator.moreThan) {
    return applyOperator({ cb: MoreThan, type: 'number', query: queryWithOp })
  }
  if (query?.byoperator === ByOperator.like) {
    return applyOperator({ cb: Like, type: 'string', query: queryWithOp })
  }
  if (query?.byoperator === ByOperator.iLike) {
    return applyOperator({ cb: ILike, type: 'string', query: queryWithOp })
  }

  return {
    idBy,
    operator: ByOperator.equal
  }
}

interface ValidIdByParams<Model extends IBaseModel> {
  idBy?: IdBy
  model: ModelClassType<Model>
}

const validIdby = async <Model extends IBaseModel>({
  idBy,
  model,
  operator
}: ValidIdByParams<Model> & { operator?: boolean }): Promise<Partial<Model>> => {
  if (!idBy) return {}
  return await validateIdBy<Model>({
    idBy,
    model,
    version: operator ? EV.GET_OPERATOR : EV.GET
  })
}

interface MakeFindOptionsParams<Model extends IBaseModel> {
  idBy?: IdBy
  model: ModelClassType<Model>
  query?: IQuery
}

export const makeFindOptions = async <Model extends IBaseModel>({ query, model, idBy }: MakeFindOptionsParams<Model>): Promise<{
  options: FindManyOptions<Model>
  operator: ByOperator
  order?: Order
}> => {
  const queryValid = await validateQuery(query)
  const idByValid = await validIdby({ idBy, model, operator: !!queryValid?.byoperator })

  const take = () => {
    if (queryValid?.limit === 'NONE') return undefined
    return queryValid?.limit ?? 10
  }
  const orderBy: object | undefined = queryValid ? { createdAt: queryValid.order } : undefined

  const { idBy: idByFinal, operator } = determineWhere({ query: queryValid, idBy: idByValid })

  return {
    options: {
      order: orderBy,
      take: take(),
      skip: queryValid?.offset ?? 0,
      where: idByFinal as {}
    },
    operator,
    order: queryValid?.order
  }
}
