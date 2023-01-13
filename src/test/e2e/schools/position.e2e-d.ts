import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testPosition = (params: TestMutableParams) => {
  describe('[ENTITY]: Position', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Position,
        mutable: params,
        excludeEndpoints: {
          get: {
            byObject: true
          }
        }
      })
    })
  })
}
