import { ISchool } from '../../../components/schools/models/school.model'
import { schoolFaker } from '../../fakers/schools'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testSchool = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: School', () => {
    const path = basePath + 'school/'
    console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<ISchool>({
        path,
        mutable: params,
        entityFaker: schoolFaker
      })
    })
  })
}
