import { FindOptionsWhere } from 'typeorm'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import {
  School, ISchoolGet, ISchoolUpdate, ISchoolCreate
} from '../models/school.model'
import { IController, BaseController, DB, EXPOSE_VERSIONS as EV } from '../..'

type Id = ISchoolGet['id']

const dataParse = (data: unknown) => {
  if (typeof data === 'string') {
    return JSON.parse(data)
  }
  if (typeof data === 'object') {
    return data
  }
  return null
}

const validateData = async (dto: object) => {
  const valid = await validate(dto)
  if (valid.length > 0) {
    throw Error(`Invalid data: ${
      valid.reduce((previous, current) => ` ${previous} \n ${current.toString()}`, '')
    }`)
  }
}

export class SchoolController extends BaseController<School>
  implements IController<
  School,
  ISchoolCreate,
  Id,
  ISchoolGet,
  ISchoolUpdate
  > {
  constructor (
    connection: DB
  ) {
    super(connection, School)
  }

  async read (id?: Id | ISchoolGet | string) {
    if (this.repo === undefined) await this.init()
    if (id === null || id === undefined) return await this.repo.find()

    const data = dataParse(id) ?? { id }
    await validateData(plainToInstance(School, data, { version: EV.GET }))
    const res = await this.repo.find({
      where: data as FindOptionsWhere<ISchoolGet>
    })
    if (res.length < 1) return null
    return res
  }

  async create (data: ISchoolCreate | string): Promise<boolean | Id> {
    if (this.repo === undefined) await this.init()
    const finalData = dataParse(data)
    const dto = plainToInstance(School, finalData, { version: EV.CREATE })
    await validateData(dto)
    const res = await this.repo.save(dto)
    if (!isNaN(res.id)) {
      return res.id
    }
    return false
  }

  async update (id: Id, data: string | ISchoolUpdate): Promise<boolean> {
    if (this.repo === undefined) await this.init()
    const finalData = plainToInstance(School, dataParse(data), { version: EV.UPDATE })
    await validateData(finalData)
    const whereOptions: FindOptionsWhere<ISchoolGet> = {
      id
    }
    const res = await this.repo.update(
      whereOptions,
      finalData
    )
    return (res?.affected ?? -1) > 0
  }

  async delete (id: string | Id): Promise<boolean> {
    if (typeof id !== 'string') throw Error('Invalid Id, Id can\'t be Object')
    if (this.repo === undefined) await this.init()
    const finalData = dataParse(id)
    await validateData(plainToInstance(School, finalData, { version: EV.DELETE }))
    const whereOptions: FindOptionsWhere<ISchoolGet> = {
      // finalData;
    }
    const res = await this.repo.delete(whereOptions)
    return (res?.affected ?? -1) > 0
  }
}
