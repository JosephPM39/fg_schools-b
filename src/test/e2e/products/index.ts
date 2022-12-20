import { TestMutableParams } from '../types'
import { testBorder } from './border.e2e-d'
import { testColor } from './color.e2e-d'
import { testModel } from './model.e2e-d'
import { testProduct } from './product.e2e-d'
import { testProfile } from './profile.e2e-d'
import { testSize } from './size.e2e-d'
import { testType } from './type.e2e-d'

export const testProductComponent = (params: TestMutableParams) => {
  describe('[COMPONENT]: Products', () => {
    testModel(params)
    testBorder(params)
    testColor(params)
    testSize(params)
    testType(params)
    testProduct(params)
    testProfile(params)
  })
}
