import supertest from 'supertest'
import { IBaseModel } from '../../../models_school/base.model'
import { BaseFaker } from '../../fakers/model.faker'
import { EntityFaker } from '../../fakers/types'
import { TestMutableParams } from '../types'

interface fakesGenerated<T extends IBaseModel> {
  oneWithId: Partial<T>
  oneWithoutId: Partial<Omit<T, 'id'>>
  manyWithoutId: Array<Partial<Omit<T, 'id'>>>
}

interface EFO<T> {
  entityFaker: EntityFaker<T>
}

interface FO<T extends IBaseModel> {
  fakes: fakesGenerated<T>
}

interface CEF<T extends IBaseModel, D extends {}> {
  faker: BaseFaker<T, D>
}

interface ReadExclude {
  all?: boolean
  normal?: boolean
  byId?: boolean
  byObject?: boolean
  withPagination?: boolean
}

type fakes<T extends IBaseModel, D extends {}> = FO<T> | EFO<T> | CEF<T, D>

type CrudTestsParams<T extends IBaseModel, D extends {}> = {
  mutable: TestMutableParams
  path: string
  excludeEndpoints?: {
    get?: ReadExclude
    create?: boolean
    update?: boolean
    delete?: boolean
  }
} & fakes<T, D>

const isEntityFaker = <T extends IBaseModel, D extends {}>(obj: fakes<T, D>): obj is EFO<T> => {
  return !!(obj as EFO<T>).entityFaker
}

const isFaker = <T extends IBaseModel, D extends {}>(obj: fakes<T, D>): obj is CEF<T, D> => {
  return !!(obj as CEF<T, D>).faker
}

const extractFakes = <T extends IBaseModel, D extends {}>(obj: fakes<T, D>) => {
  if (isEntityFaker(obj)) {
    return {
      oneWithId: obj.entityFaker.generateOneFake({ withId: true }),
      oneWithoutId: obj.entityFaker.generateOneFake(),
      manyWithoutId: obj.entityFaker.generateManyFakes()
    }
  }
  if (isFaker(obj)) {
    const fakes = obj.faker.getFakes()
    return {
      oneWithId: fakes.oneWithId,
      oneWithoutId: fakes.oneWithoutId,
      manyWithoutId: fakes.manyWithoutId
    }
  }
  return obj.fakes
}

export const basicCrudTests = <T extends IBaseModel, D extends {} = {}>(params: CrudTestsParams<T, D>) => {
  const fakes = extractFakes(params)

  const excludeGet = params.excludeEndpoints?.get

  if (!params.excludeEndpoints?.create) {
    test('[POST]: One DTO', async () => await supertest(params.mutable.app)
      .post(params.path)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .send(fakes.oneWithId)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toBeTruthy()
      })
    )
    test(`[POST]: ${fakes.manyWithoutId?.length ?? ''} DTO`, async () => await supertest(params.mutable.app)
      .post(params.path)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .send(fakes.manyWithoutId)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toBeTruthy()
      })
    )
  }

  if (!excludeGet?.all && !excludeGet?.normal) {
    test(`[GET]: Should return "${fakes.manyWithoutId?.length ?? ''} elements"`, async () => await supertest(params.mutable.app)
      .get(params.path)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .query({ limit: fakes.manyWithoutId?.length })
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(fakes.manyWithoutId?.length)
      })
    )
  }

  if (!excludeGet?.all && !excludeGet?.byId) {
    test('[GET]: By ID', async () => await supertest(params.mutable.app)
      .get(`${params.path}${fakes.oneWithId?.id ?? ''}`)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .expect(200)
      .then((res) => {
        expect(res.body[0].id).toBe(fakes.oneWithId?.id)
      })
    )
  }

  if (!excludeGet?.all && !excludeGet?.byObject) {
    const object: Partial<T> = { ...fakes.oneWithId }
    delete object.id
    test('[GET]: By Object', async () => await supertest(params.mutable.app)
      .get(params.path)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .send(object)
      .expect(200)
      .then((res) => {
        expect(Object.values(res.body)).toMatchObject([object])
      })
    )
  }

  if (!excludeGet?.all && !excludeGet?.withPagination) {
    test('[GET]: With pagination', async () => await supertest(params.mutable.app)
      .get(params.path)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .query({ limit: 2, offset: 4, order: 'DESC' })
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(2)
      })
    )
  }

  if (!params.excludeEndpoints?.update) {
    const newFake = fakes.oneWithoutId
    // console.log('Patch data', newFake)
    test('[PATCH]: Update one element', async () => await supertest(params.mutable.app)
      .patch(`${params.path}${fakes.oneWithId?.id ?? ''}`)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .send(newFake)
      .expect(200)
      .then((res) => {
        expect(res.body).toBe(true)
      })
    )
  }

  if (!params.excludeEndpoints?.delete) {
    test('[DELETE]: One element', async () => await supertest(params.mutable.app)
      .delete(`${params.path}${fakes.oneWithId?.id ?? ''}`)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toBe(true)
      })
    )
  }
}
