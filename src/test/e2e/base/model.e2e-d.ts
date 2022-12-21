import supertest from 'supertest'
import { ENTITIES, TestMutableParams } from '../types'

interface CreateExclude {
  all?: true
  oneWithId?: true
  manyWithoutId?: true
  manyWithId?: true
}

interface ReadExclude {
  all?: boolean
  normal?: boolean
  byId?: boolean
  byObject?: boolean
  withPagination?: boolean
}

interface UpdateExclude {
  all?: true
  oneById?: true
}

interface DeleteExclude {
  all?: true
  oneById?: true
}

interface CrudTestsParams {
  mutable: TestMutableParams
  path?: string
  entity: ENTITIES
  excludeEndpoints?: {
    get?: ReadExclude
    post?: CreateExclude
    patch?: UpdateExclude
    delete?: DeleteExclude
  }
}

const logErrorValidation = (res: any, dto: any) => {
  if (res.body?.details) {
    res.body.details.map((e: any) => console.log(e, 'Validation error'))
    console.log(dto, 'data delivered')
  }
}

export const basicCrudTests = (params: CrudTestsParams) => {
  let fakes = params.mutable.fakers?.[params.entity].getFakes()
  let objToSearch = fakes?.oneWithoutId
  const {
    path = `${params.mutable.basePath ?? ''}${params.entity}`
  } = params

  beforeAll(() => {
    fakes = params.mutable.fakers?.[params.entity].getFakes()
    objToSearch = { ...fakes?.oneWithId }
    delete objToSearch?.id
    if (!fakes) throw new Error('Worng Fakes')
  })

  const excludeGet = params.excludeEndpoints?.get
  const excludeCreate = params.excludeEndpoints?.post
  const excludeUpdate = params.excludeEndpoints?.patch
  const excludeDelete = params.excludeEndpoints?.delete

  if (!excludeCreate?.all && !excludeCreate?.oneWithId) {
    test('[POST]: One DTO with ID', (done) => {
      void supertest(params.mutable.app)
        .post(path)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .send(fakes?.oneWithId)
        .expect((res) => res.body?.details?.map((e: any) => console.log(e, 'FAllo')))
        .expect('Content-Type', /json/)
        .expect((res) => logErrorValidation(res, fakes?.oneWithId))
        .expect(201)
        .expect((res) => !!res.body)
        .end(done)
    })
  }

  if (!excludeCreate?.all && !excludeCreate?.manyWithoutId) {
    test(`[POST]: ${fakes?.manyWithoutId?.length ?? ''} DTO without ID`, (done) => {
      void supertest(params.mutable.app)
        .post(path)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .send(fakes?.manyWithoutId)
        .expect((res) => logErrorValidation(res, fakes?.manyWithoutId))
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res) => !!res.body)
        .end(done)
    })
  }

  if (!excludeCreate?.all && !excludeCreate?.manyWithId) {
    test(`[POST]: ${fakes?.manyWithId?.length ?? ''} DTO with ID`, (done) => {
      void supertest(params.mutable.app)
        .post(path)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .send(fakes?.manyWithId)
        .expect((res) => logErrorValidation(res, fakes?.manyWithId))
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res) => !!res.body)
        .end(done)
    })
  }

  if (!excludeGet?.all && !excludeGet?.normal) {
    test(`[GET]: Should return "${fakes?.manyWithoutId?.length ?? ''} elements"`, (done) => {
      void supertest(params.mutable.app)
        .get(path)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .query({ limit: fakes?.manyWithoutId?.length })
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true)
          expect(res.body.length).toBe(fakes?.manyWithoutId.length)
        })
        .end(done)
    })
  }

  if (!excludeGet?.all && !excludeGet?.byId) {
    test('[GET]: By ID', (done) => {
      void supertest(params.mutable.app)
        .get(`${path}/${fakes?.oneWithId?.id ?? ''}`)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true)
          expect(res.body[0].id).toBe(fakes?.oneWithId?.id)
        })
        .end(done)
    })
  }

  if (!excludeGet?.all && !excludeGet?.byObject) {
    test('[GET]: By Object', (done) => {
      void supertest(params.mutable.app)
        .post(`${path}/get-filtered`)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .send(objToSearch)
        .expect(200)
        .expect((res) => expect(Object.values(res.body)).toMatchObject([objToSearch]))
        .end(done)
    })
  }

  if (!excludeGet?.all && !excludeGet?.withPagination) {
    test('[GET]: With pagination', (done) => {
      void supertest(params.mutable.app)
        .get(path)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .query({ limit: 2, offset: 4, order: 'DESC' })
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true)
          expect(res.body.length).toBe(2)
        })
        .end(done)
    })
  }

  if (!excludeUpdate?.all && !excludeUpdate?.oneById) {
    const newFake = fakes?.oneWithoutId
    test('[PATCH]: Update one element', (done) => {
      void supertest(params.mutable.app)
        .patch(`${path}/${fakes?.oneWithId?.id ?? ''}`)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .send(newFake)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBe(true)
        })
        .end(done)
    })
  }

  if (!excludeDelete?.all && !excludeDelete?.oneById) {
    test('[DELETE]: One element', (done) => {
      void supertest(params.mutable.app)
        .delete(`${path}/${fakes?.oneWithId?.id ?? ''}`)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBe(true)
        })
        .end(done)
    })
  }
}
