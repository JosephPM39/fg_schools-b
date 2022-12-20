import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testProduct = (params: TestMutableParams) => {
  describe('[ENTITY]: Product', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Product,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
