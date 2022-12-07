import { IEmployee } from '../../../models_school/'
import { employeeFaker } from '../../fakers/schools'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testEmployee = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Employee', () => {
    const path = basePath + 'employee/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<IEmployee>({
        path,
        mutable: params,
        entityFaker: employeeFaker
      })
    })
  })
}
