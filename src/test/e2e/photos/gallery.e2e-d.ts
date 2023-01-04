import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testGallery = (params: TestMutableParams) => {
  describe('[ENTITY]: Gallery', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Gallery,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
