import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testBorder = (params: TestMutableParams) => {
  describe('[ENTITY]: Border', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Border,
        mutable: params
      })
    })
  })
}
