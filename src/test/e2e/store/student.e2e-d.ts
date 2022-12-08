import { IStudent } from '../../../models_school/'
import { studentFaker } from '../../fakers/store'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testStudent = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Student', () => {
    const path = basePath + 'student/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<IStudent>({
        path,
        mutable: params,
        entityFaker: studentFaker
      })
    })
  })
}
