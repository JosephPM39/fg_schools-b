import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testOrder = (params: TestMutableParams) => {
  describe('[ENTITY]: Order', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Order,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
