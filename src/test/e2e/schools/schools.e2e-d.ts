import supertest from 'supertest'
import { schoolFaker } from '../../fakers/schools'
import { TestMutableParams } from '../types'

export const testSchool = (params: TestMutableParams, basePath: string) => {
  describe('Test for school', () => {
    const path = basePath + 'school/'
    console.log(path, 'URL')

    describe('Test for [POST]', () => {
      const fake = schoolFaker.generateOneFake()
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
    })

    describe('Test for [GET]', () => {
      test('should return "10 elements"', async () => await supertest(params.app)
        .get(path)
        .expect(200)
        .then((res) => {
          expect(res.body.length).toBeGreaterThan(0)
        })
      )
    })
  })
}
