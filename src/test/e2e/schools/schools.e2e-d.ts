import { basicCrudTests } from '../base/model.e2e-d'
import { COMPONENTS, SCHOOLS_ENTITIES, TestMutableParams } from '../types'

export const testSchool = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: School', () => {
    const path = basePath + 'schools/school/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))
    describe('- BASIC CRUD', () => {
      basicCrudTests({
        path,
        component: COMPONENTS.Schools,
        entity: SCHOOLS_ENTITIES.School,
        mutable: params
      })
    })
  })
}
