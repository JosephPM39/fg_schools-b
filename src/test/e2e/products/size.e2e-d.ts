import { ISize } from '../../../models_school/'
import { sizeFaker } from '../../fakers/products'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testSize = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Size', () => {
    const path = basePath + 'size/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<ISize>({
        path,
        mutable: params,
        entityFaker: sizeFaker
      })
    })
  })
}
