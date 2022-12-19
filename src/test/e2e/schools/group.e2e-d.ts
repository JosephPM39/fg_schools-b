import { basicCrudTests } from '../base/model.e2e-d'
import { COMPONENTS, SCHOOLS_ENTITIES, TestMutableParams } from '../types'

export const testGroup = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Group', () => {
    const path = basePath + 'schools/group/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests({
        path,
        component: COMPONENTS.Schools,
        entity: SCHOOLS_ENTITIES.Group,
        mutable: params
      })
    })
  })
}
