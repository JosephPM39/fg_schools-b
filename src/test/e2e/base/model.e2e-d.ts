import supertest from 'supertest'
import { EntityFaker } from '../../fakers/types'
import { TestMutableParams } from '../types'

interface CrudTestsParams<T> {
  mutable: TestMutableParams
  path: string
  entityFaker: EntityFaker<T>
}

export const basicCrudTests = <T extends { id: string }>(params: CrudTestsParams<T>) => {
  const fake = params.entityFaker.generateOneFake({ withId: true })
  const fakes = params.entityFaker.generateManyFakes()
  test('[POST]: One DTO', async () => await supertest(params.mutable.app)
    .post(params.path)
    .send(fake)
    .expect('Content-Type', /json/)
    .expect(201)
    .then((res) => {
      expect(res.body).toBeTruthy()
    })
  )
  test(`[POST]: ${fakes.length} DTO`, async () => await supertest(params.mutable.app)
    .post(params.path)
    .send(fakes)
    .expect('Content-Type', /json/)
    .expect(201)
    .then((res) => {
      expect(res.body).toBeTruthy()
    })
  )

  test(`[GET]: Should return "${fakes.length} elements"`, async () => await supertest(params.mutable.app)
    .get(params.path)
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBe(fakes.length)
    })
  )
  test('[GET]: By ID', async () => await supertest(params.mutable.app)
    .get(`${params.path}${fake.id ?? ''}`)
    .expect(200)
    .then((res) => {
      expect(res.body[0].id).toBe(fake.id)
    })
  )
  const object = { ...fake }
  delete object.id
  test('[GET]: By Object', async () => await supertest(params.mutable.app)
    .get(params.path)
    .send(object)
    .expect(200)
    .then((res) => {
      expect(Object.values(res.body)).toMatchObject([object])
    })
  )

  test('[GET]: With pagination', async () => await supertest(params.mutable.app)
    .get(params.path)
    .query({ limit: 2, offset: 4, order: 'DESC' })
    .expect(200)
    .then((res) => {
      expect(res.body.length).toBe(2)
    })
  )
  const newFake = params.entityFaker.generateOneFake()
  // console.log('Patch data', newFake)
  test('[PATCH]: Update one element', async () => await supertest(params.mutable.app)
    .patch(`${params.path}${fake.id ?? ''}`)
    .send(newFake)
    .expect(200)
    .then((res) => {
      expect(res.body).toBe(true)
    })
  )

  test('[DELETE]: One element', async () => await supertest(params.mutable.app)
    .delete(`${params.path}${fake.id ?? ''}`)
    .expect(200)
    .then((res) => {
      expect(res.body).toBe(true)
    })
  )
}
