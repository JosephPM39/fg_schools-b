import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testModel = (params: TestMutableParams) => {
  describe('[ENTITY]: Model', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Model,
        mutable: params
      })
    })
  })
}
