import supertest from 'supertest'
import { IBaseModel } from '../../../models_school/base.model'
import { BaseFaker } from '../../fakers/model.faker'
import { EntityFaker } from '../../fakers/types'
import { COMPONENTS, SCHOOLS_ENTITIES, TestMutableParams } from '../types'

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

type fakes<T extends IBaseModel, D extends {}> = FO<T> | EFO<T> | CEF<T, D>

interface CrudTestsParams {
  mutable: TestMutableParams
  path: string
  component: COMPONENTS
  entity: SCHOOLS_ENTITIES
  excludeEndpoints?: {
    get?: ReadExclude
    post?: CreateExclude
    patch?: UpdateExclude
    delete?: DeleteExclude
  }
}

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

export const basicCrudTests = (params: CrudTestsParams) => {
  let fakes = params.mutable.fakers?.[params.component][params.entity].getFakes()
  let objToSearch = fakes?.oneWithoutId

  beforeAll(() => {
    fakes = params.mutable.fakers?.[params.component][params.entity].getFakes()
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
        .post(params.path)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .send(fakes?.oneWithId)
        .expect('Content-Type', /json/)
        .expect((res) => {
          if (res.body.details) {
            res.body.details.map((c: any) => console.log(c, 'error'))
          }
        })
        .expect(201)
        .expect((res) => !!res.body)
        .end(done)
    })
  }

  if (!excludeCreate?.all && !excludeCreate?.manyWithoutId) {
    test(`[POST]: ${fakes?.manyWithoutId?.length ?? ''} DTO without ID`, (done) => {
      void supertest(params.mutable.app)
        .post(params.path)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .send(fakes?.manyWithoutId)
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res) => !!res.body)
        .end(done)
    })
  }

  if (!excludeCreate?.all && !excludeCreate?.manyWithId) {
    test(`[POST]: ${fakes?.manyWithId?.length ?? ''} DTO with ID`, (done) => {
      void supertest(params.mutable.app)
        .post(params.path)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .send(fakes?.manyWithId)
        .expect('Content-Type', /json/)
        .expect(201)
        .expect((res) => !!res.body)
        .end(done)
    })
  }

  if (!excludeGet?.all && !excludeGet?.normal) {
    test(`[GET]: Should return "${fakes?.manyWithoutId?.length ?? ''} elements"`, (done) => {
      void supertest(params.mutable.app)
        .get(params.path)
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
        .get(`${params.path}${fakes?.oneWithId?.id ?? ''}`)
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
        .get(params.path)
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
        .get(params.path)
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
    // console.log('Patch data', newFake)
    test('[PATCH]: Update one element', (done) => {
      void supertest(params.mutable.app)
        .patch(`${params.path}${fakes?.oneWithId?.id ?? ''}`)
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
        .delete(`${params.path}${fakes?.oneWithId?.id ?? ''}`)
        .set('Authorization', `Bearer ${params.mutable?.auth?.token ?? ''}`)
        .expect(200)
        .expect((res) => {
          expect(res.body).toBe(true)
        })
        .end(done)
    })
  }
}
