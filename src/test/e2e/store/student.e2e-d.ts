import { basicCrudTests } from '../base/'
import { ENTITIES, TestMutableParams } from '../types'

export const testStudent = (params: TestMutableParams) => {
  describe('[ENTITY]: Student', () => {
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        entity: ENTITIES.Student,
        mutable: params
      })
    })
  })
}
