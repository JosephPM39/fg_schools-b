import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testPhoto = (params: TestMutableParams) => {
  describe('[ENTITY]: Photo', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Photo,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
