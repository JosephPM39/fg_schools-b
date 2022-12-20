import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testGroup = (params: TestMutableParams) => {
  describe('[ENTITY]: Group', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Group,
        mutable: params
      })
    })
  })
}
