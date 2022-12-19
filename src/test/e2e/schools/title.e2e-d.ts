import { basicCrudTests } from '../base/model.e2e-d'
import { COMPONENTS, SCHOOLS_ENTITIES, TestMutableParams } from '../types'

export const testTitle = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Title', () => {
    const path = basePath + 'schools/title/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        path,
        component: COMPONENTS.Schools,
        entity: SCHOOLS_ENTITIES.Title,
        mutable: params
      })
    })
  })
}
