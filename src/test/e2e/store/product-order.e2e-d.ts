import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testProductOrder = (params: TestMutableParams) => {
  describe('[ENTITY]: Product-Order', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.ProductOrder,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
