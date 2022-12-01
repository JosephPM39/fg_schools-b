import { EntityTarget } from 'typeorm'
import { ValidatorOptions } from 'class-validator'
import { ClassConstructor } from 'class-transformer'

export enum EXPOSE_VERSIONS {
  UPDATE = 1,
  CREATE = 2,
  FULL = 3,
  GET = 4,
  DELETE = 5,
}

type Id = string | object

interface CreateParams {
  data: object[] | object
}

interface ReadParams {
  id?: Id
  order: 'DESC' | 'ASC' | string
  limit: number
  offset: number
}

interface UpdateParams {
  id: Id
  data: object
}

interface DeleteParams {
  id: Id
}

export interface IController<Model> {
  create: (params: CreateParams) => Promise<boolean | Model[]>
  read: (params: ReadParams) => Promise<Model | null | Model[]>
  update: (params: ) => Promise<boolean>
  delete: (id: Id | string, softDelete?: boolean) => Promise<boolean>
}

export type ModelClassType<Model> = EntityTarget<Model> | ClassConstructor<Model>

export interface ValidateDtoOptions<Model> {
  dto: object
  model: ModelClassType<Model>
  version: EXPOSE_VERSIONS
  validatorOptions?: ValidatorOptions
}

export interface ValidateIdOptions<Model> {
  id: string | object
  model: ModelClassType<Model>
  version: EXPOSE_VERSIONS
}
