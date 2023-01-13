import { Repository, FindOptionsWhere } from 'typeorm'
import { IBaseModel } from '../../models_school/base.model'
import { Connection } from '../db/'
import { CreateParams, DeleteParams, EXPOSE_VERSIONS as EV, IController, ModelClassType, ReadParams, UpdateParams } from '../types'
import { validateDto, validateIdBy } from '../validations'
import { makeFindOptions } from './read.controller.helper'

export class BaseController<Model extends IBaseModel> implements IController<Model> {
  protected repo: Repository<Model>

  constructor (
    private readonly connection: Connection,
    protected model: ModelClassType<Model>
  ) {}

  async init () {
    this.repo = await this.connection.getRepo(this.model)
  }

  async create ({ data }: CreateParams) {
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

  async read (params: ReadParams) {
    const { query, idBy } = params

    if (!this.repo) await this.init()

    const findOptions = await makeFindOptions({
      model: this.model,
      idBy,
      query
    })

    const res = await this.repo.find(findOptions.options)
    const count = await this.repo.countBy(findOptions.options.where ?? {})

    return {
      data: res.length < 1 ? null : res,
      queryUsed: {
        limit: findOptions.options.take ?? ('NONE' as const),
        offset: findOptions.options.skip,
        order: findOptions.order,
        byoperator: findOptions.operator,
        count
      }
    }
  }

  async update (params: UpdateParams) {
    const { idBy, data } = params
    if (!this.repo) await this.init()
    const idByValid = await validateIdBy<Model>({
      idBy,
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
      ...idByValid as {}
    }

    const res = await this.repo.update(
      findOptions,
      dataValid as {}
    )

    return (res.affected ?? 0) > 0
  }

  async delete (params: DeleteParams) {
    const { idBy, softDelete } = params
    if (!this.repo) await this.init()
    const idByValid = await validateIdBy<Model>({
      idBy,
      model: this.model,
      version: EV.GET
    })

    const findOptions: FindOptionsWhere<Model> = {
      ...idByValid as {}
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
