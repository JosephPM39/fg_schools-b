import { TestMutableParams } from '../types'
import { testComboOrder } from './combo-order.e2e-d'
import { testCombo } from './combo.e2e-d'
import { testOrder } from './order.e2e-d'
import { testPayment } from './payment.e2e-d'
import { testProductCombo } from './product-combo.e2e-d'
import { testProductOrder } from './product-order.e2e-d'
import { testStudent } from './student.e2e-d'

export const testStoreComponent = (params: TestMutableParams) => {
  describe('[COMPONENT]: Store', () => {
    testStudent(params)
    testCombo(params)
    testOrder(params)
    testPayment(params)
    testComboOrder(params)
    testProductOrder(params)
    testProductCombo(params)
  })
}
