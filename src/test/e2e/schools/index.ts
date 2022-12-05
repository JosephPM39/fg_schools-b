import { TestMutableParams } from '../types'
import { testGroup } from './group.e2e-d'
import { testSchool } from './schools.e2e-d'

export const testSchoolComponent = (params: TestMutableParams, basePath: string) => {
  const path = basePath + 'schools/'
  describe('[COMPONENT]: Schools', () => {
    testSchool(params, path)
    testGroup(params, path)
  })
}
