import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testColor = (params: TestMutableParams) => {
  describe('[ENTITY]: Color', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Color,
        mutable: params
      })
    })
  })
}
