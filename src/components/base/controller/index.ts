import { EntityTarget, Repository, FindOptionsWhere } from 'typeorm'
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
    for (let i = 0; i < dtos.length; i++) {
      await validateDto<Model>({
        dto: dtos[i],
        model: this.model,
        version: EV.CREATE
      })
    }
    // I should study this save method, that this update if the
    // data al ready exists
    const res: Model[] = await this.repo.save(dtos)
    if (!res) return false
    return res
  }

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

  async update (id: Id | string, data: object | Update) {
    if (!this.repo) await this.init()
    const idDto: object = typeof id === 'object' ? id : { id }
    await validateDto<Model>({
      dto: idDto,
      model: this.model,
      version: EV.GET
    })
    await validateDto<Model>({
      dto: data,
      model: this.model,
      version: EV.UPDATE
    })

    const findOptions: FindOptionsWhere<Model> = {
      ...idDto
    }

    const res = await this.repo.update(
      findOptions,
      data
    )

    if (res.affected ?? 0 < 1) return false
    return true
  }

  async delete (id: string | Id, softDelete?: boolean) {
    if (!this.repo) await this.init()
    const idDto: object = typeof id === 'object' ? id : { id }
    await validateDto<Model>({
      dto: idDto,
      model: this.model,
      version: EV.GET
    })

    const findOptions: FindOptionsWhere<Model> = {
      ...idDto
    }

    let res

    if (softDelete) {
      res = await this.repo.softDelete(findOptions)
    } else {
      res = await this.repo.delete(findOptions)
    }

    if (res.affected ?? 0 < 1) return false
    return true
  }
}
