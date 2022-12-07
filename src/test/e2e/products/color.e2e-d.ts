import { IColor } from '../../../models_school/'
import { colorFaker } from '../../fakers/products'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testColor = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Color', () => {
    const path = basePath + 'color/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<IColor>({
        path,
        mutable: params,
        entityFaker: colorFaker
      })
    })
  })
}
