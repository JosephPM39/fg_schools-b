import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testPhotoProduct = (params: TestMutableParams) => {
  describe('[ENTITY]: Photo-Product', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.PhotoProduct,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
