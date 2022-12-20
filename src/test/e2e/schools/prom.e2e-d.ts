import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testProm = (params: TestMutableParams) => {
  describe('[ENTITY]: Prom ', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Prom,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithId: true }
        }
      })
    })
  })
}
