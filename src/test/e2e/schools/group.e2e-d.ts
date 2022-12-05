import { IGroup } from '../../../components/schools/models/group.model'
import { groupFaker } from '../../fakers/schools'
import { basicCrudTests } from '../base/model.e2e-d'
import { TestMutableParams } from '../types'

export const testGroup = (params: TestMutableParams, basePath: string) => {
  describe('[ENTITY]: Group', () => {
    const path = basePath + 'group/'
    // console.log(path, 'URL')

    // const logResValitaionError = (res: any) => res.body.details.map((c: any) => console.log(c, 'error'))

    describe('- BASIC CRUD', () => {
      basicCrudTests<IGroup>({
        path,
        mutable: params,
        entityFaker: groupFaker
      })
    })
  })
}
