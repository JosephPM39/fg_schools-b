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

export interface IController<T, Create, Id, Get, Update > {
  create: (data: Create | object | Create[] | object[]) => Promise<boolean | T[]>
  read: (id?: Id | Get | string) => Promise<T | null | T[]>
  update: (id: Id, data: Update | string) => Promise<boolean>
  delete: (id: Id | string) => Promise<boolean>
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
