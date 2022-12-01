import { EntityTarget, Repository, FindOptionsWhere, FindManyOptions } from 'typeorm'
import { DB } from '../../../db/'
import { ClassConstructor } from 'class-transformer'
import { EXPOSE_VERSIONS as EV, IController, ModelClassType } from '../types'
import { validateDto, validateId } from '../validations'

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
    model: ModelClassType<Model>
  ) {
    this.connection = connection
    this.model = model
  }

  async init () {
    this.repo = await this.connection.getRepo(this.model)
  }

  async create (data: object[] | Create[] | object | Create) {
    if (!this.repo) await this.init()
    const dtos: Model[] = Array.isArray(data) ? data : [data]
    const dtosValid: Model[] = []
    for (let i = 0; i < dtos.length; i++) {
      const dtoValid = await validateDto<Model>({
        dto: dtos[i],
        model: this.model,
        version: EV.CREATE
      })
      dtosValid.push(dtoValid)
    }
    // I should study this save method, that this update if the
    // data al ready exists
    const res: Model[] = await this.repo.save(dtosValid)
    if (!res) return false
    return res
  }

  async read (id?: string | Id | Get) {
    const { order, limit, offset } = params
    const findOptions: FindManyOptions<Model> = {
      order: {
        createdAt: ''
      } as object
    }
    if (!this.repo) await this.init()
    if (!id) return await this.repo.find({})

    const idValid = await validateId<Model>({ id, model: this.model, version: EV.GET })

    const findOptionsWhere: FindOptionsWhere<Model> = {
      ...idValid
    }

    findOptions.where = findOptionsWhere

    const res = await this.repo.find(findOptions)

    if (res.length < 1) return null
    return res
  }

  async update (id: Id | string, data: object | Update) {
    if (!this.repo) await this.init()
    const idValid = await validateId<Model>({
      id,
      model: this.model,
      version: EV.GET
    })
    const dataValid = await validateDto<Model>({
      dto: data,
      model: this.model,
      version: EV.UPDATE,
      validatorOptions: {
        skipMissingProperties: true,
        skipUndefinedProperties: true
      }
    })

    const findOptions: FindOptionsWhere<Model> = {
      ...idValid
    }

    const res = await this.repo.update(
      findOptions,
      dataValid
    )

    return (res.affected ?? 0) > 0
  }

  async delete (id: string | Id, softDelete?: boolean) {
    if (!this.repo) await this.init()
    const idValid = await validateId<Model>({
      id,
      model: this.model,
      version: EV.GET
    })

    const findOptions: FindOptionsWhere<Model> = {
      ...idValid
    }

    let res

    if (softDelete) {
      res = await this.repo.softDelete(findOptions)
    } else {
      res = await this.repo.delete(findOptions)
    }

    return (res.affected ?? 0) > 0
  }
}
