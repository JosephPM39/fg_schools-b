import { EntityTarget } from 'typeorm'
import { ValidatorOptions } from 'class-validator'
import { ClassConstructor, ClassTransformOptions } from 'class-transformer'
import { IQuery } from '../validations/query'

export enum EXPOSE_VERSIONS {
  UPDATE = 1,
  CREATE = 2,
  FULL = 3,
  GET = 4,
  GET_OPERATOR = 5,
  CREATE_NESTED = 6,
  DELETE = 7,
}

export type WithRequired<T, K extends keyof T> = { [P in keyof T]?: T[P] | undefined } & { [P in K]-?: T[P] }

export type IdBy = string | object

export interface CreateParams {
  data: object[] | object
}

export interface ReadParams {
  idBy?: IdBy
  query?: IQuery
}

export interface UpdateParams {
  idBy: IdBy
  data: object
}

export interface DeleteParams {
  idBy: IdBy
  softDelete?: boolean
}

export interface IController<Model> {
  create: (params: CreateParams) => Promise<boolean | Model[]>
  read: (params: ReadParams) => Promise<{ data: Model[] | null, queryUsed: Partial<IQuery> & { count: number } }>
  update: (params: UpdateParams) => Promise<boolean>
  delete: (params: DeleteParams) => Promise<boolean>
}

export type ModelClassType<Model> = EntityTarget<Model> | ClassConstructor<Model>

export interface ValidateDtoOptions<Model> {
  dto: object
  model: ModelClassType<Model>
  version?: EXPOSE_VERSIONS
  validatorOptions?: ValidatorOptions
  transformOptions?: ClassTransformOptions
}

export interface ValidateIdOptions<Model> {
  idBy: IdBy
  model: ModelClassType<Model>
  version: EXPOSE_VERSIONS
}
