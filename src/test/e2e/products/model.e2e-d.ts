import { IModel } from '../../../models_school/'
import { modelFaker } from '../../fakers/products'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testModel = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Model', () => {
    const path = basePath + 'model/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<IModel>({
        path,
        mutable: params,
        entityFaker: modelFaker
      })
    })
  })
}
