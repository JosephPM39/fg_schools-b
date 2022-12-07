/*

import supertest from 'supertest'
import { EntityFaker } from '../../fakers/types'
import { TestMutableParams } from '../types'

interface CrudTestsParams<T> {
  mutable: TestMutableParams
  path: string
  entityFaker: EntityFaker<T>
  excludeEndpoints?: {
    read?: {
      byId?: boolean
      many?: boolean
      byPagination?: boolean
      byObject?: boolean
      all?: boolean
    }
    create?: {
      one?: boolean
      many?: boolean
      all?: boolean
    }
    update?: boolean
    delete?: boolean
  }
}

interface TestParams {
  mutable: TestMutableParams
  path: string
}

interface PostOneParams<T> extends TestParams {
  fake: Partial<T>
}

interface PostManyParams<T> extends TestParams {
  fakes: Array<Partial<T>>
}

const postOneDTO = <T>(params: PostOneParams<T>) => {
  test('[POST]: One DTO', async () => await supertest(params.mutable.app)
    .post(params.path)
    .set('Authorization', `Bearer ${params.mutable.auth?.token ?? ''}`)
    .send(params.fake)
    .expect('Content-Type', /json/)
    .expect(201)
    .then((res) => {
      expect(res.body).toBeTruthy()
    })
  )
}

const postManyDTO = <T>(params: PostManyParams<T>) => {
  test(`[POST]: ${params.fakes.length} DTO`, async () => await supertest(params.mutable.app)
    .post(params.path)
    .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
    .send(params.fakes)
    .expect('Content-Type', /json/)
    .expect(201)
    .then((res) => {
      expect(res.body).toBeTruthy()
    })
  )
}

export const basicCrudTests = <T extends { id: string }>(params: CrudTestsParams<T>) => {
  const fake = params.entityFaker.generateOneFake({ withId: true })
  const fakes = params.entityFaker.generateManyFakes()

  const create = params.excludeEndpoints?.create

  if (!create?.all && !create?.one) {
    postOneDTO<T>({
      mutable: params.mutable,
      path: params.path,
      fake
    })
  }

  if (!create?.all && !create?.many) {
    postManyDTO<T>({
      mutable: params.mutable,
      path: params.path,
      fakes
    })
  }

  if (params.excludeEndpoints?.read !== true) {
    test(`[GET]: Should return "${fakes.length} elements"`, async () => await supertest(params.mutable.app)
      .get(params.path)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
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
    console.log(object, 'Objecto')
    test('[GET]: By Object', async () => await supertest(params.mutable.app)
      .get(params.path)
      .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
      .send(object)
      .expect(200)
      .then((res) => {
        console.log(res.body, 'recived')
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

  if (params.excludeEndpoints?.update !== true) {
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

  if (params.excludeEndpoints?.delete !== true) {
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

*/

export {}
