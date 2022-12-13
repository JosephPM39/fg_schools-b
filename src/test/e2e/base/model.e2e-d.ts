import supertest from 'supertest'
import { EntityFaker } from '../../fakers/types'
import { TestMutableParams } from '../types'

interface CrudTestsParams<T> {
  mutable: TestMutableParams
  path: string
  entityFaker: EntityFaker<T>
  excludeEndpoints?: {
    read?: boolean
    create?: boolean
    update?: boolean
    delete?: boolean
  }
}

export const basicCrudTests = <T extends { id: string }>(params: CrudTestsParams<T>) => {
  const fake = params.entityFaker.generateOneFake({ withId: true })
  const fakes = params.entityFaker.generateManyFakes()

  if (!params.excludeEndpoints?.create) {
    test('[POST]: One DTO', async () => await supertest(params.mutable.app)
      .post(params.path)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .send(fake)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toBeTruthy()
      })
    )
    test(`[POST]: ${fakes.length} DTO`, async () => await supertest(params.mutable.app)
      .post(params.path)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .send(fakes)
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        expect(res.body).toBeTruthy()
      })
    )
  }

  if (!params.excludeEndpoints?.read) {
    test(`[GET]: Should return "${fakes.length} elements"`, async () => await supertest(params.mutable.app)
      .get(params.path)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .query({ limit: fakes.length })
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBe(fakes.length)
      })
    )
    test('[GET]: By ID', async () => await supertest(params.mutable.app)
      .get(`${params.path}${fake.id ?? ''}`)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .expect(200)
      .then((res) => {
        expect(res.body[0].id).toBe(fake.id)
      })
    )
    const object = { ...fake }
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
    const newFake = params.entityFaker.generateOneFake()
    // console.log('Patch data', newFake)
    test('[PATCH]: Update one element', async () => await supertest(params.mutable.app)
      .patch(`${params.path}${fake.id ?? ''}`)
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
      .delete(`${params.path}${fake.id ?? ''}`)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toBe(true)
      })
    )
  }
}
