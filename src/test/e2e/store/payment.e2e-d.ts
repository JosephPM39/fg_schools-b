import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testPayment = (params: TestMutableParams) => {
  describe('[ENTITY]: Payment', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Payment,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
