import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testTitle = (params: TestMutableParams) => {
  describe('[ENTITY]: Title', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Title,
        mutable: params
      })
    })
  })
}
