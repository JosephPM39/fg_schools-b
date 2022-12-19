import { basicCrudTests } from '../base/model.e2e-d'
import { COMPONENTS, SCHOOLS_ENTITIES, TestMutableParams } from '../types'

export const testEmployeePosition = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Employee Position', () => {
    const path = basePath + `${COMPONENTS.Schools}/${SCHOOLS_ENTITIES.EmployeePosition}/`
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        path,
        component: COMPONENTS.Schools,
        entity: SCHOOLS_ENTITIES.EmployeePosition,
        mutable: params,
        excludeEndpoints: {
          get: { byObject: true },
          post: { manyWithoutId: true }
        }
      })
    })
  })
}
