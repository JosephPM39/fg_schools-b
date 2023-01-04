import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testSectionProm = (params: TestMutableParams) => {
  describe('[ENTITY]: Section Prom', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.SectionProm,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
