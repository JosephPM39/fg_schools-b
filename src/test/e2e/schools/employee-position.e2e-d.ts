import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testEmployeePosition = (params: TestMutableParams) => {
  describe('[ENTITY]: Employee Position', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.EmployeePosition,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
