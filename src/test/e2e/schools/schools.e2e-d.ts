import supertest from 'supertest'
import { schoolFaker } from '../../fakers/schools'
import { TestMutableParams } from '../types'

export const testSchool = (params: TestMutableParams, basePath: string) => {
  describe('School Entity', () => {
    const path = basePath + 'school/'
    console.log(path, 'URL')
    const fake = schoolFaker.generateOneFake(true)
    const fakes = schoolFaker.generateManyFakes()

    describe('[POST]', () => {
      test('Post one DTO', async () => await supertest(params.app)
        .post(path)
        .send(fake)
        .expect('Content-Type', /json/)
        // .expect((res: any) => res.body.details.map((c: any) => console.log(c, 'error')))
        .expect(201)
        .then((res) => {
          expect(res.body).toBeTruthy()
        })
      )
      test('Post 10 DTO', async () => await supertest(params.app)
        .post(path)
        .send(fakes)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) => {
          expect(res.body).toBeTruthy()
        })
      )
    })

    describe('[GET]', () => {
      test('Should return "11 elements"', async () => await supertest(params.app)
        .get(path)
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBe(11)
        })
      )
      test('Get by ID', async () => await supertest(params.app)
        .get(`${path}${fake.id ?? ''}`)
        .expect(200)
        .then((res) => {
          expect(res.body[0].id).toBe(fake.id)
        })
      )
    })

    describe('[PATCH]', () => {
      const newFake = schoolFaker.generateOneFake()
      test('Update one element', async () => await supertest(params.app)
        .patch(`${path}${fake.id ?? ''}`)
        .send(newFake)
        .expect(200)
        .then((res) => {
          expect(res.body).toBe(true)
        })
      )
    })

    describe('[DELETE]', () => {
      test('Delete one element', async () => await supertest(params.app)
        .delete(`${path}${fake.id ?? ''}`)
        .expect(200)
        .then((res) => {
          expect(res.body).toBe(true)
        })
      )
    })
  })
}
