import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testGalleryAlbum = (params: TestMutableParams) => {
  describe('[ENTITY]: Gallery Album', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.GalleryAlbum,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
