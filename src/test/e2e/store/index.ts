import { TestMutableParams } from '../types'
import { testCombo } from './combo.e2e-d'
import { testStudent } from './student.e2e-d'

export const testStoreComponent = (params: TestMutableParams) => {
  describe('[COMPONENT]: Store', () => {
    testStudent(params)
    testCombo(params)
  })
}
