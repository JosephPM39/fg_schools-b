import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testEmployee = (params: TestMutableParams) => {
  describe('[ENTITY]: Employee', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Employee,
        mutable: params
      })
    })
  })
}
