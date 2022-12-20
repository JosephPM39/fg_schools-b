import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testSize = (params: TestMutableParams) => {
  describe('[ENTITY]: Size', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Size,
        mutable: params
      })
    })
  })
}
