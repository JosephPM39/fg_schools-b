import { basicCrudTests } from '../base/model.e2e-d'
import { COMPONENTS, SCHOOLS_ENTITIES, TestMutableParams } from '../types'

export const testProm = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Prom ', () => {
    const path = basePath + 'schools/prom/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests({
        path,
        component: COMPONENTS.Schools,
        entity: SCHOOLS_ENTITIES.Prom,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithId: true }
        }
      })
    })
  })
}
