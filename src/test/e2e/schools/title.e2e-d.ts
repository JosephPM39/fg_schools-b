import { ITitle } from '../../../models_school/'
import { titleFaker } from '../../fakers/schools'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testTitle = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Title', () => {
    const path = basePath + 'schools/title/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<ITitle>({
        path,
        mutable: params,
        entityFaker: titleFaker
      })
    })
  })
}
