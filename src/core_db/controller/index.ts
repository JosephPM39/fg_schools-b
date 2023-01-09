import { Repository, FindOptionsWhere, FindManyOptions } from 'typeorm'
import { Connection } from '../db/'
import { CreateParams, DeleteParams, EXPOSE_VERSIONS as EV, IController, ModelClassType, ReadParams, UpdateParams } from '../types'
import { validateDto, validateIdBy, validateQuery } from '../validations'

export class BaseController<Model extends {}> implements IController<Model> {
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
    const queryValid = await validateQuery(query)
    const take = () => {
      if (queryValid?.limit === 'NONE') return undefined
      return queryValid?.limit ?? 10
    }

    const orderBy: object | undefined = queryValid ? { createdAt: queryValid.order } : undefined
    const findOptions: FindManyOptions<Model> = {
      order: orderBy,
      take: take(),
      skip: queryValid?.offset ?? 0
    }

    const validIdby = async ({ idBy }: Pick<ReadParams, 'idBy'>) => {
      if (!idBy) return {}
      return await validateIdBy<Model>({
        idBy,
        model: this.model,
        version: EV.GET
      })
    }

    const idByValid = await validIdby({ idBy })

    const findOptionsWhere: FindOptionsWhere<Model> = {
      ...idByValid
    }

    findOptions.where = findOptionsWhere

    const res = await this.repo.find(findOptions)
    if (res.length < 1) return null
    return res
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
      ...idByValid
    }

    const res = await this.repo.update(
      findOptions,
      dataValid
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
      ...idByValid
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
