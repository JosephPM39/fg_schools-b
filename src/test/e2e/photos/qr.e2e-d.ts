import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testQr = (params: TestMutableParams) => {
  describe('[ENTITY]: Qr', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Qr,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
