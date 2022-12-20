import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testProfile = (params: TestMutableParams) => {
  describe('[ENTITY]: Profile', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Profile,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
