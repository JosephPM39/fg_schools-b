import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testSchool = (params: TestMutableParams) => {
  describe('[ENTITY]: School', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.School,
        mutable: params
      })
    })
  })
}
