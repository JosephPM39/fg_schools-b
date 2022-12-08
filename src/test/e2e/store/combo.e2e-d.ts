import { ICombo } from '../../../models_school/'
import { comboFaker } from '../../fakers/store'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testCombo = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Combo', () => {
    const path = basePath + 'combo/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<ICombo>({
        path,
        mutable: params,
        entityFaker: comboFaker
      })
    })
  })
}
