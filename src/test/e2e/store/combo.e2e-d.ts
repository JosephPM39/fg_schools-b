import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testCombo = (params: TestMutableParams) => {
  describe('[ENTITY]: Combo', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Combo,
        mutable: params
      })
    })
  })
}
