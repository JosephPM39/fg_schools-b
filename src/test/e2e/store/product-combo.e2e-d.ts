import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testProductCombo = (params: TestMutableParams) => {
  describe('[ENTITY]: Product-Combo', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.ProductCombo,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
