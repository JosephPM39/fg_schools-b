import { IBorder } from '../../../models_school/'
import { borderFaker } from '../../fakers/products'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testBorder = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Border', () => {
    const path = basePath + 'border/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<IBorder>({
        path,
        mutable: params,
        entityFaker: borderFaker
      })
    })
  })
}
