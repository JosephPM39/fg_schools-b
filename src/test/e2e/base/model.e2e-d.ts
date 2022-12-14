import supertest from 'supertest'
import { IBaseModel } from '../../../models_school/base.model'
import { EntityFaker } from '../../fakers/types'
import { TestMutableParams } from '../types'

interface fakesGenerated<T extends IBaseModel> {
  oneWithId: T
  oneWithoutId: Omit<T, 'id'>
  manyWithoutId: Array<Omit<T, 'id'>>
}

interface EFO<T> {
  entityFaker: EntityFaker<T>
}

interface FO<T extends IBaseModel> {
  fakes: fakesGenerated<T>
}

type fakes<T extends IBaseModel> = FO<T> | EFO<T>

type CrudTestsParams<T extends IBaseModel> = {
  mutable: TestMutableParams
  path: string
  excludeEndpoints?: {
    read?: boolean
    create?: boolean
    update?: boolean
    delete?: boolean
  }
} & fakes<T>

const isEntityFaker = <T extends IBaseModel>(obj: fakes<T>): obj is EFO<T> => {
  return !!(obj as EFO<T>).entityFaker
}

const extractFakes = <T extends IBaseModel>(obj: fakes<T>) => {
  if (isEntityFaker(obj)) {
    return {
      oneWithId: obj.entityFaker.generateOneFake({ withId: true }),
      oneWithoutId: obj.entityFaker.generateOneFake(),
      manyWithoutId: obj.entityFaker.generateManyFakes()
    }
  }
  return obj.fakes
}

export const basicCrudTests = <T extends IBaseModel>(params: CrudTestsParams<T>) => {
  const fakes = extractFakes(params)

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
    test(`[POST]: ${fakes.manyWithoutId.length} DTO`, async () => await supertest(params.mutable.app)
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

  if (!params.excludeEndpoints?.read) {
    test(`[GET]: Should return "${fakes.manyWithoutId.length} elements"`, async () => await supertest(params.mutable.app)
      .get(params.path)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .query({ limit: fakes.manyWithoutId.length })
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(fakes.manyWithoutId.length)
      })
    )
    test('[GET]: By ID', async () => await supertest(params.mutable.app)
      .get(`${params.path}${fakes.oneWithId.id ?? ''}`)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .expect(200)
      .then((res) => {
        expect(res.body[0].id).toBe(fakes.oneWithId.id)
      })
    )
    const object = { ...fakes.oneWithId }
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
      .patch(`${params.path}${fakes.oneWithId.id ?? ''}`)
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
      .delete(`${params.path}${fakes.oneWithId.id ?? ''}`)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toBe(true)
      })
    )
  }
}
