import supertest from 'supertest'
import { IEmployeePosition } from '../../../models_school'
import { employeeFaker, positionFaker } from '../../fakers/schools'
import { EmployeePositionFaker, D as Dependencies } from '../../fakers/schools/employee-position.faker-r'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testEmployeePosition = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Employee Position', () => {
    const path = basePath + 'schools/employee-position/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    const dependencies = {
      employee: employeeFaker.generateOneFake({ withId: true }),
      position: positionFaker.generateOneFake({ withId: true })
    } as Dependencies

    const faker = new EmployeePositionFaker()
    faker.makeManyFake(dependencies)
    faker.makeOneFake(dependencies)
    faker.makeOneFake(dependencies, 'withId')

    describe('- FAKING DATA TO RELATION', () => {
      test('[FAKING]: POSITION', async () => await supertest(params.app)
        .post(`${basePath}schools/position/`)
        .set('Authorization', `Bearer ${params.auth?.token ?? ''}`)
        .send(dependencies.position)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) => {
          expect(res.body).toBeTruthy()
        })
      )

      test('[FAKING]: EMPLOYEE', async () => await supertest(params.app)
        .post(`${basePath}schools/employee/`)
        .set('Authorization', `Bearer ${params.auth?.token ?? ''}`)
        .send(dependencies.employee)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) => {
          expect(res.body).toBeTruthy()
        })
      )
    })

    describe('- BASIC CRUD', () => {
      basicCrudTests<IEmployeePosition, Dependencies>({
        path,
        mutable: params,
        faker,
        excludeEndpoints: {
          get: { byObject: true }
        }
      })
    })
  })
}
