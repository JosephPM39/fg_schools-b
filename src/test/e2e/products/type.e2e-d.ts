import { IType } from '../../../models_school/'
import { typeFaker } from '../../fakers/products'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testType = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Type', () => {
    const path = basePath + 'type/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<IType>({
        path,
        mutable: params,
        entityFaker: typeFaker
      })
    })
  })
}
