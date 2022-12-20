import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testType = (params: TestMutableParams) => {
  describe('[ENTITY]: Type', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Type,
        mutable: params
      })
    })
  })
}
