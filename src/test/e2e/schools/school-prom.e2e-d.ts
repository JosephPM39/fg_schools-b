import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testSchoolProm = (params: TestMutableParams) => {
  describe('[ENTITY]: School Prom', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.SchoolProm,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
