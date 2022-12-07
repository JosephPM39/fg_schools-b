import { TestMutableParams } from '../types'
import { testModel } from './model.e2e-d'

export const testProductComponent = (params: TestMutableParams, basePath: string) => {
  const path = basePath + 'products/'
  describe('[COMPONENT]: Products', () => {
    testModel(params, path)
  })
}
