import supertest from 'supertest'
import { IEmployeePosition } from '../../../models_school'
import { employeeFaker, positionFaker, employeePositionFaker } from '../../fakers/schools'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testEmployeePosition = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Employee Position', () => {
    const path = basePath + 'schools/employee-position/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    const fakesWithUtilities = {
      oneWithId: employeePositionFaker.makeOneFake({ employeeFaker, positionFaker, withId: true }),
      oneWithoutId: employeePositionFaker.makeOneFake({ employeeFaker, positionFaker }),
      manyWithoutId: employeePositionFaker.makeManyFakes({ employeeFaker, positionFaker })
    }

    const fakes = {
      oneWithId: fakesWithUtilities.oneWithId.fake,
      oneWithoutId: fakesWithUtilities.oneWithoutId.fake,
      manyWithoutId: fakesWithUtilities.manyWithoutId.fakes
    }

    const employees = [
      fakesWithUtilities.oneWithId.employee,
      fakesWithUtilities.oneWithoutId.employee,
      ...fakesWithUtilities.manyWithoutId.employees
    ]

    const positions = [
      fakesWithUtilities.oneWithId.position,
      fakesWithUtilities.oneWithoutId.position,
      ...fakesWithUtilities.manyWithoutId.positions
    ]

    describe('- FAKING DATA TO RELATION', () => {
      test('[FAKING]: POSITION', async () => await supertest(params.app)
        .post(`${basePath}schools/position/`)
        .set('Authorization', `Bearer ${params.auth?.token ?? ''}`)
        .send(positions)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) => {
          expect(res.body).toBeTruthy()
        })
      )

      test('[FAKING]: EMPLOYEE', async () => await supertest(params.app)
        .post(`${basePath}schools/employee/`)
        .set('Authorization', `Bearer ${params.auth?.token ?? ''}`)
        .send(employees)
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) => {
          expect(res.body).toBeTruthy()
        })
      )
    })

    describe('- BASIC CRUD', () => {
      basicCrudTests<IEmployeePosition>({
        path,
        mutable: params,
        fakes,
        excludeEndpoints: {
          get: { byObject: true }
        }
      })
    })
  })
}
