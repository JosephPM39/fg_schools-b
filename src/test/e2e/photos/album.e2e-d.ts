import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testAlbum = (params: TestMutableParams) => {
  describe('[ENTITY]: Album', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Album,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
