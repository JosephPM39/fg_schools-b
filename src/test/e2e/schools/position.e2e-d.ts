import { IPosition } from '../../../models_school/'
import { positionFaker } from '../../fakers/schools'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testPosition = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Position', () => {
    const path = basePath + 'position/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<IPosition>({
        path,
        mutable: params,
        entityFaker: positionFaker
      })
    })
  })
}
