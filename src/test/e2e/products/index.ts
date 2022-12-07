import { TestMutableParams } from '../types'
import { testBorder } from './border.e2e-d'
import { testColor } from './color.e2e-d'
import { testModel } from './model.e2e-d'
import { testSize } from './size.e2e-d'
import { testType } from './type.e2e-d'

export const testProductComponent = (params: TestMutableParams, basePath: string) => {
  const path = basePath + 'products/'
  describe('[COMPONENT]: Products', () => {
    testModel(params, path)
    testBorder(params, path)
    testColor(params, path)
    testSize(params, path)
    testType(params, path)
  })
}
