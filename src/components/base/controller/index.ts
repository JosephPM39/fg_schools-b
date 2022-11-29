import { EntityTarget, Repository, FindOptionsWhere } from 'typeorm'
import { DB } from '../../../db/'
import { validate, ValidatorOptions } from 'class-validator'
import { ClassConstructor, plainToInstance } from 'class-transformer'
import { EXPOSE_VERSIONS as EV } from '../types'
import Boom from '@hapi/boom'

export interface IController<T, Create, Id, Get, Update > {
  create: (data: Create | string) => Promise<boolean | Id>
  read: (id?: Id | Get | string) => Promise<T | null | T[]>
  update: (id: Id, data: Update | string) => Promise<boolean>
  delete: (id: Id | string) => Promise<boolean>
}

type modelClassType<Model> = EntityTarget<Model> | ClassConstructor<Model>

interface validateDtoOptions<Model> {
  dto: object
  model: modelClassType<Model>
  version: EV
  validatorOptions?: ValidatorOptions
}

interface validateIdOptions<Model> {
  id: string | object
  model: modelClassType<Model>
  version: EV
}

const validateId = async <Model extends {}>(params: validateIdOptions<Model>) => {
  const { id, version, model } = params
  if (typeof id === 'string') {
    await validateDto<Model>({
      dto: { id },
      model,
      version,
      validatorOptions: {
        skipMissingProperties: true
      }
    })
    return { id }
  }
  if (typeof id === 'object') {
    return id
  }
}

const validateDto = async <Model extends {}>(params: validateDtoOptions<Model>) => {
  const { model, dto, version } = params
  const instance = plainToInstance(
    model as ClassConstructor<Model>,
    dto,
    { version }
  )
  const valid = await validate(instance, params.validatorOptions)
  if (valid.length > 0) {
    throw Boom.badRequest(`Invalid data: ${
      valid.reduce((previous, current) => ` ${previous} \n ${current.toString()}`, '')
    }`)
  }
}

export class BaseController<
  Model extends {},
  Create extends {},
  Id extends {},
  Get extends {},
  Update extends {}
> implements IController<Model, Create, Id, Get, Update> {
  protected repo: Repository<Model>

  protected model: EntityTarget<Model> | ClassConstructor<Model>

  private readonly connection: DB

  constructor (
    connection: DB,
    model: modelClassType<Model>
  ) {
    this.connection = connection
    this.model = model
  }

  async init () {
    this.repo = await this.connection.getRepo(this.model)
  }

  create: (data: string | Create) => Promise<boolean | Id>

  async read (id?: string | Id | Get) {
    if (!this.repo) await this.init()
    if (!id) return await this.repo.find()

    const data = await validateId<Model>({ id, model: this.model, version: EV.GET })

    const findOptions: FindOptionsWhere<Model> = {
      ...data
    }

    const res = await this.repo.find({
      where: findOptions
    })

    if (res.length < 1) return null
    return res
  }

  update: (id: Id, data: string | Update) => Promise<boolean>

  delete: (id: string | Id) => Promise<boolean>
}
