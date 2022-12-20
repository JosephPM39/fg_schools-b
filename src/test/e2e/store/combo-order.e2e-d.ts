import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testComboOrder = (params: TestMutableParams) => {
  describe('[ENTITY]: Combo-Order', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.ComboOrder,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
